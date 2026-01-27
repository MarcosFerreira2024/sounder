import { inject, injectable } from "tsyringe";
import { AppUser } from "../../../shared/types/user";
import { canChangeAlbum } from "../rules/canChangeAlbum";
import { MusicAlbum } from "../../../generated/prisma/client";
import { IAlbumRepository } from "../interfaces/IAlbumRepository";
import { isAdmin } from "../../../shared/rules/isAdmin";

@injectable()
class UpdateAlbum{ 

    constructor(@inject("AlbumRepository") private albumRepository: IAlbumRepository) {}

    async execute(user:AppUser,albumId:string,data:{cover?:string;name?:string,authorId?:string}):Promise<MusicAlbum | null>{

        
        const album= await this.albumRepository.getAlbumById(albumId);

        if(!album)throw new Error("Album not found");

        if(!canChangeAlbum(user,album.authorId))throw new Error("You don't have permission to update this album");
        

        if(data.authorId && !isAdmin(user))throw new Error("You don't have permission to change the author of this album");

        
        
        const updatedAlbum = await this.albumRepository.update(albumId,data);

        return updatedAlbum;
        


    }
}

export { UpdateAlbum };