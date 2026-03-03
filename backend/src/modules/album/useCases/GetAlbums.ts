import { inject, injectable } from "tsyringe";
import {
  albumQueryFilters,
  IAlbumRepository,
} from "../interfaces/IAlbumRepository.js";
import { Album } from "../../../generated/prisma/client.js";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse.js";

@injectable()
class GetAlbums {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository,
  ) {}

  async execute(
    page?: number,
    limit?: number,
    search?: albumQueryFilters,
  ): Promise<{ items: Album[]; page: number; totalItems: number }> {
    const albums = await this.albumRepository.getAlbums(search, page, limit);

    return normalizePaginatedResponse<Album>(albums, page);
  }
}

export { GetAlbums };
