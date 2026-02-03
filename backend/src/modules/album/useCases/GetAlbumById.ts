import { injectable, inject } from "tsyringe";
import { IAlbumRepository } from "../interfaces/IAlbumRepository";
import { Album } from "../../../generated/prisma/client";

@injectable()
class GetAlbumById {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository
  ) {}

  async execute(id: string): Promise<Album> {





    const albumFound = await this.albumRepository.getAlbumById(id);

    if (!albumFound) throw new Error("Album not found");


    return albumFound
}
}

export { GetAlbumById };
