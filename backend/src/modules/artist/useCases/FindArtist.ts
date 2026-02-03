import { inject, injectable } from "tsyringe";
import { Music } from "../../../generated/prisma/client";
import { artistsQueryFilters, IArtistRepository } from "../interfaces/IArtistRepository";

@injectable()
class FindArtists { 



    constructor(@inject("ArtistRepository") private artistRepository: IArtistRepository) {}

    async execute( search?: artistsQueryFilters,page?:number, limit?:number): Promise<{ artistId: string; userId: string; name: string; }[]> {
        const artists = await this.artistRepository.getArtists(search,page,limit)

        return artists;
    }
}

export { FindArtists };