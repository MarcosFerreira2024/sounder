import { inject, injectable } from "tsyringe";
import { IAlbumRepository } from "../../album/interfaces/IAlbumRepository";
import { IMusicRepository } from "../interfaces/IMusicRepository";
import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { canChangeMusic } from "../rules/canChangeMusic";

@injectable()
class AssignMusicToAlbum {

    constructor(@inject("MusicRepository") private musicRepository:IMusicRepository,@inject("AlbumRepository") private albumRepository:IAlbumRepository){}


    async execute(musicId:string,albumId:string,user:AppUser, artistId?:string){

        if(isAdmin(user) && !artistId) throw new Error("Provide a artistId")
        
        const music = await this.musicRepository.getMusicById(musicId)
        if(!music) throw new Error("This music doesn't exists")

        if(!canChangeMusic(user,music.artistId)) throw new Error("Unauthorized")
        

        const album = await this.albumRepository.getAlbumById(albumId)
        if(!album) throw new Error("This album doesn't exists")



        return await this.musicRepository.assignMusicToAlbum(music.id,album.id)

        
        
        






    }



}

export {AssignMusicToAlbum}