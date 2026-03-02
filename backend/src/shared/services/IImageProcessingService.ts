export type BlurImagesPaths = {
  blur100: string;
  blur75: string;
  blur50: string;
  blur25: string;
};

export interface IImageProcessingService {
  ensureBlurImages(
    originalImageUrl: string,
    artistId: string,
  ): Promise<BlurImagesPaths>;
}
