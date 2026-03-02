import { inject, injectable } from "tsyringe";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { IMusicRepository } from "../../music/interfaces/IMusicRepository";
import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { IMusicActionRepository } from "../../music/interfaces/IMusicActionRepository";

@injectable()
class RemoveFromPlaylist {
  constructor(
    @inject("PlaylistRepository")
    private playlistRepository: IPlaylistRepository,
    @inject("MusicRepository") private musicRepository: IMusicRepository,
    @inject("MusicActionRepository")
    private musicActionRepository: IMusicActionRepository,
  ) {}

  async execute(playlistId: string, musicId: string, user: AppUser) {
    const playlist = await this.playlistRepository.getPlaylistById(playlistId);
    if (!playlist) throw new Error("Playlist does not exist");

    const hasPermissions = playlist.ownerId === user.id || isAdmin(user);
    if (!hasPermissions)
      throw new Error(
        "You do not have permission to change musics from this playlist",
      );

    const music = await this.musicRepository.getMusicById(musicId);
    if (!music) throw new Error("Music does not exist");

    const playlistMusics =
      await this.playlistRepository.getMusicsByPlaylistId(playlistId);
    const isInPlaylist = playlistMusics.find((item) => item.id === musicId);
    if (!isInPlaylist) throw new Error("Music is not in this playlist");

    const interacted =
      await this.musicActionRepository.getInteractedMusicsByUser(user.id);
    const isLiked = interacted.find(
      (item) => item.musicId === musicId && item.reaction === "LIKE",
    );

    if (isLiked) {
      await Promise.all([
        this.musicActionRepository.upsert({
          musicId,
          userId: user.id,
          reaction: "DISLIKE",
        }),
        this.musicRepository.removeLike(musicId),
      ]);
    }

    await this.playlistRepository.removeMusicFromPlaylist(playlistId, musicId);
  }
}

export { RemoveFromPlaylist };
