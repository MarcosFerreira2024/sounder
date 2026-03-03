import { injectable, inject } from "tsyringe";
import {
  AlbumWithAuthor,
  IAlbumRepository,
} from "../interfaces/IAlbumRepository.js";

@injectable()
class GetAlbumById {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository,
  ) {}

  async execute(id: string): Promise<AlbumWithAuthor> {
    const albumFound = await this.albumRepository.getAlbumById(id);

    if (!albumFound) throw new Error("Album not found");

    return albumFound;
  }
}

export { GetAlbumById };
