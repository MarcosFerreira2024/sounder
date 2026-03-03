import { inject, injectable } from "tsyringe";
import { IMusicRepository } from "../interfaces/IMusicRepository.js";
import { Music } from "../../../generated/prisma/client.js";

@injectable()
class GetMusicById { 



    constructor(@inject("MusicRepository") private musicRepository: IMusicRepository) {}

    async execute(musicId: string): Promise<Music> {
        const music = await this.musicRepository.getMusicById(musicId);
        
        if(!music) throw new Error("Music not found");

        return music;
    }
}

export { GetMusicById };