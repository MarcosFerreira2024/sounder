import { Playlist } from "../../../generated/prisma/client";
import { PlaylistVisibility } from "../../../generated/prisma/enums";
import { MusicWithCover, PlaylistMusicItem } from "../../music/interfaces/IMusicRepository";

export type updatePayload = Partial<{
  image: string;
  name: string;
  visibility: PlaylistVisibility;
}>;

type playlistFilters = Partial<{
  name: string;
  visibility: PlaylistVisibility;
  ownerId: string;
}>;

interface IPlaylistRepository {
  getPlaylistByUserId(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<Playlist[]>;

  getPlaylists(
    search?: playlistFilters,
    page?: number,
    limit?: number,
  ): Promise<Playlist[]>;

  getPlaylistById(playlistId: string): Promise<Playlist | null>;
  updatePlaylist(playlistId: string, payload: updatePayload): Promise<Playlist>;
  getMusicsByPlaylistId(
    playlistId: string,
    page?: number,
    limit?: number,
  ): Promise<PlaylistMusicItem[]>;

  createPlaylist(
    userId: string,
    payload: Partial<{ name: string; image: string | null }>,
  ): Promise<Playlist>;
  deletePlaylist(playlistId: string): Promise<void>;

  removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<void>;
  addMusicToPlaylist(playlistId: string, musicId: string): Promise<void>;
}

export { IPlaylistRepository };
