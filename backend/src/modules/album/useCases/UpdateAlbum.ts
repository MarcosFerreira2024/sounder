import { inject, injectable } from "tsyringe";
import { AppUser } from "../../../shared/types/user.js";
import { canChangeAlbum } from "../rules/canChangeAlbum.js";
import { IAlbumRepository } from "../interfaces/IAlbumRepository.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { Album } from "../../../generated/prisma/client.js";
import { IArtistRepository } from "../../artist/interfaces/IArtistRepository.js";

@injectable()
class UpdateAlbum{ 

    constructor(@inject("AlbumRepository") private albumRepository: IAlbumRepository,
    @inject("ArtistRepository") private artistRepository: IArtistRepository) {}

    async execute(user:AppUser,albumId:string,data:{cover?:string;name?:string,authorId?:string}):Promise<Album | null>{

        
        const album= await this.albumRepository.getAlbumById(albumId);


        if(!album)throw new Error("Album not found");

        if(!canChangeAlbum(user,album.authorId))throw new Error("You don't have permission to update this album");
        

        if(data.authorId){
            if(!isAdmin(user))throw new Error("You don't have permission to change the author of this album");
            const doesArtistExist=await this.artistRepository.getArtistById(data.authorId);
            if(!doesArtistExist)throw new Error("Artist not found");
        }


        const updatedAlbum = await this.albumRepository.update(albumId,data);

        return updatedAlbum;
        


    }
}

export { UpdateAlbum };