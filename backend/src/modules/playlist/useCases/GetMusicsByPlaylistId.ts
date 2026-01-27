import { inject, injectable } from "tsyringe";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { canSeePlaylist } from "../rules/canSeePlaylist";
import { User } from "better-auth/types";


@injectable()
class GetMusicsByPlaylistId {
    constructor(@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository) {}

    async execute(playlistId: string,user:User): Promise<{id:string,name:string,audio:string}[]> {



        const playlistExists = await this.playlistRepository.getPlaylistById(playlistId);
        if (!playlistExists) {
            throw new Error("Playlist does not exist");
        }


        canSeePlaylist(playlistExists.ownerId, playlistExists.visibility,user);

        
        const musics = await this.playlistRepository.getMusicsByPlaylistId(playlistId);
        return musics;




    }
}

export { GetMusicsByPlaylistId }