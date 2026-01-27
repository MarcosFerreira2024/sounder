import { User } from "better-auth/types";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";

@injectable()
class GetPlaylistsByUserId {


    constructor (@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository, @inject("UserRepository") private userRepository: IUserRepository) {}


    async execute (userId: string,user?:User) {

        const userExists = await this.userRepository.findById(userId);
        if (!userExists) {
            throw new Error("User does not exist, cannot fetch playlists");
        }



        const shouldSeePrivatePlaylists = user?.id === userId ;


        const playlists = await this.playlistRepository.getPlaylistByUserId(userId);

        console.log(shouldSeePrivatePlaylists);


        if(!shouldSeePrivatePlaylists) {
            return playlists.filter(playlist => playlist.visibility !== "PRIVATE");

        }else {
            return playlists
        }




        

    }
}

export { GetPlaylistsByUserId }