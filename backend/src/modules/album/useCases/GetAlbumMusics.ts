import { inject, injectable } from "tsyringe";
import {
  AlbumWithMusics,
  IAlbumRepository,
} from "../interfaces/IAlbumRepository";

@injectable()
class GetAlbumMusics {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository,
  ) {}

  execute(albumId: string): Promise<AlbumWithMusics | null> {
    return this.albumRepository.getAlbumMusics(albumId);
  }
}

export { GetAlbumMusics };
