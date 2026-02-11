import { inject, injectable } from "tsyringe";
import { ISearchService } from "../interfaces/ISearchService";
import { QueryType } from "../services/SearchService";

@injectable()
class SearchByQuery {
  constructor(@inject("SearchService") private searchService: ISearchService) {}

  async execute(query: string, type: QueryType) {
    const dataFromService = await this.searchService.search(query, type);

    const publicUser = dataFromService.profiles?.map((user) => {
      return {
        id: user.id,
        name: user.name,
        image: user.image,
      };
    });

    return {
      artists: dataFromService.artists,
      albums: dataFromService.albums,
      musics: dataFromService.musics,
      playlists: dataFromService.playlists,
      profiles: publicUser,
    };
  }
}

export { SearchByQuery };
