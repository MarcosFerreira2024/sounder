import { inject, injectable } from "tsyringe";
import { IMusicRepository, musicQueryFilters } from "../interfaces/IMusicRepository";
import { Music } from "../../../generated/prisma/client";

@injectable()
class GetMusics { 



    constructor(@inject("MusicRepository") private musicRepository: IMusicRepository) {}

    async execute(page:number, limit:number, search?: musicQueryFilters): Promise<Music[]> {
        const musics = await this.musicRepository.getMusics(page, limit, search);

        console.log(musics)
        return musics;
    }
}

export { GetMusics };