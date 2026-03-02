import { injectable, inject } from "tsyringe";
import sharp from "sharp";
import {
  IImageProcessingService,
  BlurImagesPaths,
} from "./IImageProcessingService";
import { IFileStorage } from "../../modules/file/IFileStorage";

@injectable()
export class ImageProcessingService implements IImageProcessingService {
  constructor(
    @inject("FileStorage")
    private fileStorage: IFileStorage,
  ) {}

  public async ensureBlurImages(
    originalImageUrl: string,
    artistId: string,
  ): Promise<BlurImagesPaths> {
    const { folder, filename, contentType } =
      this.extractFileInfoFromUrl(originalImageUrl);
    const baseName = filename.substring(0, filename.lastIndexOf("."));
    const ext = filename.substring(filename.lastIndexOf("."));

    const blurPaths: BlurImagesPaths = {
      blur100: "",
      blur75: "",
      blur50: "",
      blur25: "",
    };

    const supabaseBlurPaths: { [key: string]: string } = {
      blur100: `${folder}/${baseName}-blur100${ext}`,
      blur75: `${folder}/${baseName}-blur75${ext}`,
      blur50: `${folder}/${baseName}-blur50${ext}`,
      blur25: `${folder}/${baseName}-blur25${ext}`,
    };

    const baseUrl = originalImageUrl.substring(
      0,
      originalImageUrl.lastIndexOf("/"),
    );
    (Object.keys(blurPaths) as Array<keyof BlurImagesPaths>).forEach((key) => {
      const blurLevel = key.replace("blur", "");
      blurPaths[key] = `${baseUrl}/${baseName}-${blurLevel}${ext}`;
    });

    try {
      const originalImageBuffer = await this.fileStorage.download(
        `${artistId}/albums/${folder}/${filename}`,
      );

      const blurLevels = {
        blur100: 100,
        blur75: 75,
        blur50: 50,
        blur25: 25,
      };

      const promises = [];
      for (const key of Object.keys(
        blurLevels,
      ) as (keyof typeof blurLevels)[]) {
        promises.push(
          sharp(originalImageBuffer)
            .blur(blurLevels[key])
            .toBuffer()
            .then(async (blurredBuffer) => {
              const blurredFileName = `${baseName}-${key}${ext}`;
              const { path: publicUrl } = await this.fileStorage.save({
                buffer: blurredBuffer,
                filename: blurredFileName,
                folder: folder,
                contentType: contentType,
              });
              blurPaths[key] = publicUrl;
            }),
        );
      }
      await Promise.all(promises);
    } catch (error) {
      console.error("Error processing blur images from Supabase:", error);
      throw error;
    }

    return blurPaths;
  }

  private extractFileInfoFromUrl(url: string): {
    folder: string;
    filename: string;
    contentType: string;
  } {
    const parts = url.split("/");
    const filenameWithExtension = parts[parts.length - 1];
    const folder = parts[parts.length - 2];

    let contentType = "application/octet-stream";
    if (
      filenameWithExtension.endsWith(".jpg") ||
      filenameWithExtension.endsWith(".jpeg")
    ) {
      contentType = "image/jpeg";
    } else if (filenameWithExtension.endsWith(".png")) {
      contentType = "image/png";
    } else if (filenameWithExtension.endsWith(".webp")) {
      contentType = "image/webp";
    }

    return {
      folder: folder,
      filename: filenameWithExtension,
      contentType: contentType,
    };
  }
}
