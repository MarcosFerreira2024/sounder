import { Music } from "../../../generated/prisma/client.js";

export type musicQueryFilters = {
  name?: string;
  audio?: string;
  id?: string;
  artistId?: string;
  genresName?: string[];

  authorName?: string;
};

export type PlaylistMusicItem = {
  id: string;
  name: string;
  audio: string;
  likeCount: number;
  cover?: string | null;
  lyrics: string;
  author: string;
  genres: string[];
};

export type MusicWithCover = Music & {
  cover?: string | null;
};
export type LikedMusicsWithCover = MusicWithCover & { liked: boolean | null };
export type LikedPlaylistMusicItem = PlaylistMusicItem & {
  liked: boolean | null;
};

interface IMusicRepository {
  getMusicById(musicId: string): Promise<MusicWithCover | null>;

  getRandomMusic(exclude?: string[]): Promise<MusicWithCover | null>;

  deleteByAlbumId(albumId: string): Promise<void>;

  updateMany(
    albumId: string,
    data: Partial<{
      name: string;
      audio: string;
      artistId: string;
      albumId: string | null;
    }>,
  ): Promise<void>;

  getMusics(
    search?: musicQueryFilters,
    page?: number,
    limit?: number,
    excludeMusics?: string[],
    operator?: "AND" | "OR",
  ): Promise<MusicWithCover[]>;

  createMusic(data: {
    name: string;
    audio: string;
    artistId: string;
    lyrics: string;
    genres: string[];
    albumId: string;
  }): Promise<Music>;

  addLike(musicId: string): Promise<void>;

  removeLike(musicId: string): Promise<void>;

  updateMusic(
    musicId: string,
    data: Partial<{
      name: string;
      audio: string;
      artistId: string;
      albumId: string;
    }>,
  ): Promise<Music>;

  deleteMusic(musicId: string): Promise<void>;

  assignMusicToAlbum(musicId: string, albumId: string): Promise<Music>;
}

export { IMusicRepository };
