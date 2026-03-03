import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { IFileStorage } from "./IFileStorage.js";
import "dotenv/config";
import crypto from "crypto";

export class SupabaseFileStorage implements IFileStorage {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_API_SECRET;
    const supabaseAPIkey = process.env.SUPABASE_API_KEY;

    if (!supabaseUrl) {
      throw new Error(
        "Supabase URL must be provided in environment variables.",
      );
    }

    const key = supabaseSecret || supabaseAPIkey;

    if (!key) {
      throw new Error(
        "Supabase Service Role Key or Anon Key must be provided in environment variables.",
      );
    }

    this.supabase = createClient(supabaseUrl, key);
  }

  async save({
    buffer,
    filename,
    folder,
    contentType,
  }: any): Promise<{ path: string }> {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const safeName = `${fileHash}-${filename}`;
    const filePath = `${folder}/${safeName}`;

    const { data, error } = await this.supabase.storage
      .from("Sounder")
      .upload(filePath, buffer, {
        contentType: contentType || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file to Supabase: ${error.message}`);
    }

    const { data: publicUrlData } = this.supabase.storage
      .from("Sounder")
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Failed to get public URL for the uploaded file.");
    }

    return { path: publicUrlData.publicUrl };
  }

  async download(filePath: string): Promise<Buffer> {
    console.log("Attempting to download from Supabase:", filePath);
    const { data, error } = await this.supabase.storage
      .from("Sounder")
      .download(filePath);

    if (error) {
      console.error("Supabase download error details:", JSON.stringify(error));
      throw new Error(
        `Failed to download file from Supabase: ${error.message || JSON.stringify(error)}`,
      );
    }

    if (!data) {
      throw new Error(`File not found or empty: ${filePath}`);
    }

    // Convert Blob to Buffer
    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
