import { inject, injectable } from "tsyringe";
import {
  IMusicRepository,
  MusicWithCover,
} from "../interfaces/IMusicRepository";
import { Music } from "../../../generated/prisma/client";
import { AppUser } from "../../../shared/types/user";
import { IMusicActionRepository } from "../interfaces/IMusicActionRepository";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse";

@injectable()
class UserMusicRecommendations {
  constructor(
    @inject("MusicRepository") private musicRepository: IMusicRepository,
    @inject("MusicActionRepository")
    private musicActionRepository: IMusicActionRepository,
  ) {}

  async execute(
    user: AppUser,
  ): Promise<{ items: MusicWithCover[]; page: number; totalItems: number }> {
    const mostInteractedGenres =
      await this.musicActionRepository.getInteractedMusicsByGenre(user.id);

    if (!mostInteractedGenres.length) {
      const musics = await this.musicRepository.getMusics({}, 1, 20);
      return normalizePaginatedResponse<MusicWithCover>(musics, 1);
    }

    const interactedMusics =
      await this.musicActionRepository.getInteractedMusicsByUser(user.id);

    const topGenres = mostInteractedGenres
      .slice(0, 3)
      .map((genres) => genres.genre);

    const interactedMusicsIds = interactedMusics.map((music) => music.musicId);

    const musics = await this.musicRepository.getMusics(
      {
        genresName: topGenres,
      },
      1,
      10,
      interactedMusicsIds,
    );

    if (musics.length === 0) {
      const musics = await this.musicRepository.getMusics(
        {},
        1,
        10,
        interactedMusicsIds,
      );
      if (!musics.length)
        throw new Error(
          "Você já interagiu com todas as músicas disponíveis. Este projeto é apenas uma demonstração e possui um conjunto limitado de dados, cheque também os jogos diários.",
        );
      return normalizePaginatedResponse<MusicWithCover>(musics, 1);
    }
    return normalizePaginatedResponse<MusicWithCover>(musics, 1);
  }
}

export { UserMusicRecommendations };
