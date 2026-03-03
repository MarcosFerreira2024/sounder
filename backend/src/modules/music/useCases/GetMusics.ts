import { inject, injectable } from "tsyringe";
import {
  IMusicRepository,
  musicQueryFilters,
} from "../interfaces/IMusicRepository.js";
import { Music } from "../../../generated/prisma/client.js";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse.js";

@injectable()
class GetMusics {
  constructor(
    @inject("MusicRepository") private musicRepository: IMusicRepository,
  ) {}

  async execute(
    page?: number,
    limit?: number,
    search?: musicQueryFilters,
  ): Promise<{ items: Music[]; page: number; totalItems: number }> {
    const musics = await this.musicRepository.getMusics(search, page, limit);

    return normalizePaginatedResponse<Music>(musics, page);
  }
}

export { GetMusics };
