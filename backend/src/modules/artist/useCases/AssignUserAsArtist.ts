import { inject, injectable } from "tsyringe";
import { IArtistRepository } from "../interfaces/IArtistRepository.js";
import { IUserRepository } from "../../user/interfaces/IUserRepository.js";
import { AppUser } from "../../../shared/types/user.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";


@injectable()
class AssignUserAsArtist {

    constructor(@inject("ArtistRepository") private artistRepository: IArtistRepository, @inject("UserRepository") private userRepository: IUserRepository) {}


    async execute(user:AppUser,userId:string): Promise<void> {


        if(isAdmin(user)){
            const userExists = await this.userRepository.findById(userId)
            if(!userExists) throw new Error("User not found")
            if(!userExists.artistId){
                await this.artistRepository.createArtist(userId)
                await this.artistRepository.assignUserAsArtist(userId)
                return
            }
            const accountStatus = await this.artistRepository.getArtistById(userExists.artistId)
            if(accountStatus?.status === "ACTIVE") throw new Error("This user is already assigned as an artist")
                
            await this.artistRepository.assignUserAsArtist(userId)

            return 
        }


        throw new Error("You don't have permissions to assign this user as an artist");





    }


}

export {AssignUserAsArtist}