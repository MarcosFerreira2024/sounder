export type BlurImagesPaths = {
  blur100: string;
  blur75: string;
  blur50: string;
  blur25: string;
};

export interface IImageProcessingService {
  albumHasBlurImages(albumCoverPath: string, albumFolder: string): BlurImagesPaths | null;
  generateBlurAndSaveImages(originalPath: string): Promise<BlurImagesPaths>;
  ensureBlurImages(albumCoverPath: string, albumFolder: string): Promise<BlurImagesPaths>;
}