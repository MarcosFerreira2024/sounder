export interface IFileStorage {
  save(input: {
    buffer: Buffer
    filename: string
    folder: string
    contentType?: string
  }): Promise<{
    path: string
  }>;
  download(filePath: string): Promise<Buffer>;
}