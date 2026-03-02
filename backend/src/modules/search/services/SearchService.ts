import { inject, injectable } from "tsyringe";

import { ISearchService, SearchResult } from "../interfaces/ISearchService";
import { IArtistRepository } from "../../artist/interfaces/IArtistRepository";
import { IAlbumRepository } from "../../album/interfaces/IAlbumRepository";
import { IMusicRepository } from "../../music/interfaces/IMusicRepository";
import { IPlaylistRepository } from "../../playlist/interfaces/IPlaylistRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";

export type QueryType =
  | "all"
  | "artists"
  | "albums"
  | "musics"
  | "playlists"
  | "profiles";

@injectable()
class SearchService implements ISearchService {
  constructor(
    @inject("ArtistRepository") private artistRepo: IArtistRepository,
    @inject("AlbumRepository") private albumRepo: IAlbumRepository,
    @inject("MusicRepository") private musicRepo: IMusicRepository,
    @inject("PlaylistRepository") private playlistRepo: IPlaylistRepository,
    @inject("UserRepository") private userRepo: IUserRepository,
  ) {}

  async search(query: string, type: QueryType): Promise<Partial<SearchResult>> {
    switch (type) {
      case "artists":
        return {
          artists: await this.artistRepo.getArtists({ name: query }, 1, 10),
        };

      case "albums":
        return {
          albums: await this.albumRepo.getAlbums({ name: query }, 1, 10),
        };

      case "musics":
        return {
          musics: await this.musicRepo.getMusics(
            { name: query, authorName: query },
            1,
            10,
            [],
            "OR",
          ),
        };
      case "playlists":
        return {
          playlists: await this.playlistRepo.getPlaylists(
            { name: query },
            1,
            10,
          ),
        };

      case "profiles":
        return {
          profiles: await this.userRepo.findUser({ name: query }, 1, 10),
        };

      case "all": {
        const [artists, albums, musics, playlists, profiles] =
          await Promise.all([
            this.artistRepo.getArtists({ name: query }, 1, 10),
            this.albumRepo.getAlbums({ name: query }, 1, 10),
            this.musicRepo.getMusics(
              { name: query, authorName: query },
              1,
              10,
              [],
              "OR",
            ),
            this.playlistRepo.getPlaylists(
              { name: query, visibility: "PUBLIC" },
              1,
              10,
            ),
            this.userRepo.findUser({ name: query }, 1, 10),
          ]);

        return {
          artists,
          albums,
          musics,
          playlists,
          profiles,
        };
      }
    }
  }
}

export { SearchService };
