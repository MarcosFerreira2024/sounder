import { inject, injectable } from "tsyringe";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository.js";
import { canSeePlaylist } from "../rules/canSeePlaylist.js";
import { User } from "better-auth/types";
import { Music } from "../../../generated/prisma/client.js";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse.js";
import {
  LikedMusicsWithCover,
  PlaylistMusicItem,
  LikedPlaylistMusicItem,
} from "../../music/interfaces/IMusicRepository.js";
import { IMusicActionRepository } from "../../music/interfaces/IMusicActionRepository.js";
import addLikeStatusToMusics from "../../../shared/helpers/addLikeStatusToMusics.js";

@injectable()
class GetMusicsByPlaylistId {
  constructor(
    @inject("PlaylistRepository")
    private playlistRepository: IPlaylistRepository,
    @inject("MusicActionRepository")
    private musicActionRepository: IMusicActionRepository,
  ) {}

  async execute(
    playlistId: string,
    user: User,
    page?: number,
    limit?: number,
  ): Promise<{
    items: LikedPlaylistMusicItem[];
    page: number;
    totalItems: number;
  }> {
    const playlistExists =
      await this.playlistRepository.getPlaylistById(playlistId);
    if (!playlistExists) {
      throw new Error("Playlist does not exist");
    }

    canSeePlaylist(playlistExists.ownerId, playlistExists.visibility, user);

    const musics = await this.playlistRepository.getMusicsByPlaylistId(
      playlistId,
      page,
      limit,
    );

    const musicsWithLikeStatus = await addLikeStatusToMusics(
      this.musicActionRepository,
      user.id,
      musics,
    );

    return normalizePaginatedResponse<LikedPlaylistMusicItem>(
      musicsWithLikeStatus,
      page,
    );
  }
}

export { GetMusicsByPlaylistId };
