import { inject, injectable } from "tsyringe";
import { Music, MusicAlbum } from "../../../generated/prisma/client";
import { albumQueryFilters, IAlbumRepository } from "../interfaces/IAlbumRepository";

@injectable()
class GetAlbums{ 



    constructor(@inject("AlbumRepository") private albumRepository: IAlbumRepository) {}

    async execute(page:number, limit:number, search?: albumQueryFilters): Promise<MusicAlbum[]> {
        return await this.albumRepository.getAlbums(page, limit, search);

        
    }
}

export { GetAlbums};