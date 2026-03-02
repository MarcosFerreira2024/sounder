import { inject, injectable } from "tsyringe";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { canSeePlaylist } from "../rules/canSeePlaylist";
import { User } from "better-auth/types";
import { Music } from "../../../generated/prisma/client";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse";
import {
  LikedMusicsWithCover,
  PlaylistMusicItem,
  LikedPlaylistMusicItem,
} from "../../music/interfaces/IMusicRepository";
import { IMusicActionRepository } from "../../music/interfaces/IMusicActionRepository";
import addLikeStatusToMusics from "../../../shared/helpers/addLikeStatusToMusics";

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
