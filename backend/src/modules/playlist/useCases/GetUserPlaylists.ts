import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { AppUser } from "../../../shared/types/user";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse";
import { Playlist } from "../../../generated/prisma/client";

@injectable()
class GetUserPlaylists {
  constructor(
    @inject("PlaylistRepository")
    private playlistRepository: IPlaylistRepository,
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(
    userId?: string,
    user?: AppUser,
    page?: number,
    limit?: number,
  ): Promise<{ items: Partial<Playlist>[]; page: number; totalItems: number }> {
    if (!user && !userId)
      throw new Error("User id or Authenticated user is required");

    let targetUserId = userId;
    if (!userId) {
      targetUserId = user!.id;
    }

    if (targetUserId) {
      const userExists = await this.userRepository.findById(targetUserId);
      if (!userExists) {
        throw new Error("User does not exist, cannot fetch playlists");
      }
    }

    let playlists = await this.playlistRepository.getPlaylistByUserId(
      targetUserId!,
      page,
      limit,
    );

    if (user?.id !== targetUserId) {
      playlists = playlists.filter(
        (playlist) => playlist.visibility !== "PRIVATE",
      );
    }

    return normalizePaginatedResponse<Partial<Playlist>>(playlists, page);
  }
}

export { GetUserPlaylists };
