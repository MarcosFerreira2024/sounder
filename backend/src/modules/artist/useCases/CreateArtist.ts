import { inject, injectable } from "tsyringe";
import { IArtistRepository } from "../interfaces/IArtistRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";


@injectable()
class CreateArtist {

    constructor(@inject("ArtistRepository") private artistRepository: IArtistRepository, @inject("UserRepository") private userRepository: IUserRepository) {}


    async execute(user:AppUser,userId:string): Promise<void> {


        if(isAdmin(user)){
            const userExists = await this.userRepository.findById(userId)
            if(!userExists) throw new Error("User not found")
            if(userExists.artistId) throw new Error("This user is already an artist")
                
            await this.artistRepository.createArtist(userId)
            return
        }


        throw new Error("You don't have permissions to create an artist");





    }


}

export {CreateArtist}