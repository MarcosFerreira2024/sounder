import { inject, injectable } from "tsyringe";
import { Playlist } from "../../../generated/prisma/client";
import { AppUser } from "../../../shared/types/user";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { canSeePlaylist } from "../rules/canSeePlaylist";


@injectable()
class GetPlaylistById {

    constructor(@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository) {}

    async execute(playlistId: string,user:AppUser): Promise<Partial<Playlist>>{


        const playlistExists = await this.playlistRepository.getPlaylistById(playlistId);
        if (!playlistExists) throw new Error("Playlist does not exist");
        

        canSeePlaylist(playlistExists.ownerId, playlistExists.visibility,user);

        return playlistExists;




    }



}

export { GetPlaylistById }