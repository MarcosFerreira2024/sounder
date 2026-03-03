import { inject, injectable } from "tsyringe";
import { IMusicRepository } from "../interfaces/IMusicRepository.js";
import { User } from "better-auth/types";
import { IMusicActionRepository } from "../interfaces/IMusicActionRepository.js";

@injectable()
class DeslikeMusic {
    constructor(@inject("MusicRepository") private musicRepository: IMusicRepository, @inject("MusicActionRepository") private musicActionRepository: IMusicActionRepository) {}

    async execute(musicId: string, user:User): Promise<void> {


        const musicExists = await this.musicRepository.getMusicById(musicId);
        if(!musicExists){
            throw new Error("Music not found");
        }

        const interactedMusics = await this.musicActionRepository.getInteractedMusicsByUser(user.id);
        if((interactedMusics.find(music=>music.musicId===musicId && music.reaction==="DISLIKE")))throw new Error("Music already desliked by user");
        
        if(musicExists.likeCount > 0){
            await this.musicRepository.removeLike(musicId)
        };
        
        await this.musicActionRepository.upsert({musicId,userId:user.id,reaction:"DISLIKE"});

        

        
    }
}

export { DeslikeMusic };