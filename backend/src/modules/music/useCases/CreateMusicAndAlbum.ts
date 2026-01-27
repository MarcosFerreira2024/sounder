import { CreateAlbum } from "../../album/useCases/CreateAlbum";
import { CreateMusic } from "./CreateMusic";
import { AppUser } from "../../../shared/types/user";
import { Music, MusicAlbum } from "../../../generated/prisma/client";

class CreateMusicAndAlbum {


    constructor(
        private createAlbum: CreateAlbum,
        private createMusic: CreateMusic
    ) {}


    async execute(user: AppUser, albumName:string,albumCover:string, musicName:string,audio:string,genres:string[],lyrics:string): Promise<{music:Music,album:MusicAlbum}> {
        
        
        const album = await this.createAlbum.execute(user, albumName, albumCover);
        
        console.log(album)
        
        const music = await this.createMusic.execute(user, musicName, audio, lyrics,genres, album.id);


        return  {
            music,
            album
        }
    
    
    }


}


export { CreateMusicAndAlbum };