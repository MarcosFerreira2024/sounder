import { User } from "better-auth/types";
import { PlaylistVisibility } from "../../../generated/prisma/enums";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { Playlist } from "../../../generated/prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePlaylist {
    constructor(@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository) {}

    async execute(user:User, payload:Partial<{name:string, photo:PlaylistVisibility}>): Promise<Playlist> {

        const playlist = await this.playlistRepository.getPlaylistByUserId(user.id);



        playlist.some((pl) => {
                if (pl.name === payload.name){
                    throw new Error("Playlist with this name already exists");
                }
        })




        return await this.playlistRepository.createPlaylist(user.id, payload);

     
    }
}

export { CreatePlaylist }