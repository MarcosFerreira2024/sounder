import { Artist } from "../../../generated/prisma/browser.js";
import { Album, Playlist, User } from "../../../generated/prisma/client.js";
import { MusicWithCover } from "../../music/interfaces/IMusicRepository.js";
import { QueryType } from "../services/SearchService.js";

export type SearchResult = {
  artists: {
    artistId: string;
    userId: string;
    name: string;
    image: string | null;
    about: string | null;
  }[];
  albums: Album[];
  musics: MusicWithCover[];
  playlists: Playlist[];
  profiles: User[] | null;
};

interface ISearchService {
  search(query: string, type: QueryType): Promise<Partial<SearchResult>>;
}

export { ISearchService };
