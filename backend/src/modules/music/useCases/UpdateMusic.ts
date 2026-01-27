import { inject, injectable } from "tsyringe";
import { Music } from "../../../generated/prisma/client";
import { IMusicRepository } from "../interfaces/IMusicRepository";
import { AppUser } from "../../../shared/types/user";
import { canChangeMusic } from "../rules/canChangeMusic";

@injectable()
class UpdateMusic{ 

    constructor(@inject("MusicRepository") private musicRepository: IMusicRepository) {}

    async execute(user:AppUser,musicId:string,data:{name?:string;audio?:string;lyrics?:string;}):Promise<Music | null>{

        
        const musicExists = await this.musicRepository.getMusicById(musicId);
        if(!musicExists)throw new Error("Music not found");
        if(!canChangeMusic(user,musicExists.authorId)){
            throw new Error("You don't have permission to update this music");
        }







        
        const updatedMusic = await this.musicRepository.updateMusic(musicId,data);

        return updatedMusic;
        


    }
}

export { UpdateMusic };