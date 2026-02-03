import { injectable } from "tsyringe";
import fs from "fs";
import path from "path";
import sharp from 'sharp';
import { IImageProcessingService, BlurImagesPaths } from "./IImageProcessingService";

@injectable()
export class ImageProcessingService implements IImageProcessingService {

  public albumHasBlurImages(
    albumCoverPath: string,
    albumFolder: string
  ): BlurImagesPaths | null {
    const coverFileName = path.basename(albumCoverPath);
    const ext = path.extname(coverFileName);
    const baseName = path.basename(coverFileName, ext);

    const paths: BlurImagesPaths = {
      blur100: path.join(albumFolder, `${baseName}-blur100${ext}`),
      blur75: path.join(albumFolder, `${baseName}-blur75${ext}`),
      blur50: path.join(albumFolder, `${baseName}-blur50${ext}`),
      blur25: path.join(albumFolder, `${baseName}-blur25${ext}`),
    };

    const allExist = Object.values(paths).every(p => fs.existsSync(p));

    return allExist ? paths : null;
  }

  public async generateBlurAndSaveImages(
    originalPath: string
  ): Promise<BlurImagesPaths> {
    if (!fs.existsSync(originalPath)) {
      throw new Error(`File does not exist: ${originalPath}`);
    }

    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const baseName = path.basename(originalPath, ext);

    const paths: BlurImagesPaths = {
      blur100: path.join(dir, `${baseName}-blur100${ext}`),
      blur75: path.join(dir, `${baseName}-blur75${ext}`),
      blur50: path.join(dir, `${baseName}-blur50${ext}`),
      blur25: path.join(dir, `${baseName}-blur25${ext}`),
    };

    const blurLevels = {
      blur100: 30,
      blur75: 20,
      blur50: 10,
      blur25: 5,
    };

    const promises = [];
    for (const key of Object.keys(paths) as (keyof BlurImagesPaths)[]) {
      promises.push(sharp(originalPath)
        .blur(blurLevels[key])
        .toFile(paths[key]));
    }
    await Promise.all(promises);


    return paths;
  }

  public async ensureBlurImages(
    albumCoverPath: string,
    albumFolder: string
  ): Promise<BlurImagesPaths> {
    const existing = this.albumHasBlurImages(albumCoverPath, albumFolder);

    if (existing) {
      return existing;
    }

    return this.generateBlurAndSaveImages(albumCoverPath);
  }
}
