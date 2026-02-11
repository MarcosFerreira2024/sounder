import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { IFileStorage } from "./IFileStorage";

export class DiskFileStorage implements IFileStorage {
  async save({ buffer, filename, folder }: any) {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const safeName = `${fileHash}-${filename}`;

    const uploadPath = path.resolve(
      process.cwd(),
      "src",
      "storage",
      "upload",
      "public",
      folder,
    );

    const destination = `src/storage/upload/public/${folder}`;

    const appURL = process.env.APP_URL;

    await fs.mkdir(uploadPath, { recursive: true });

    const fullPath = path.join(uploadPath, safeName);

    await fs.writeFile(fullPath, buffer);

    return {
      path: appURL + `/` + destination + `/` + safeName,
    };
  }
}
