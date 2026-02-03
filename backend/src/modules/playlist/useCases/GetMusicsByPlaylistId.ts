import { inject, injectable } from "tsyringe";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { canSeePlaylist } from "../rules/canSeePlaylist";
import { User } from "better-auth/types";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse";
import { Music } from "../../../generated/prisma/client";


@injectable()
class GetMusicsByPlaylistId {
    constructor(@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository) {}

    async execute(playlistId: string,user:User, page?: number, limit?: number): Promise<{items:Partial<Music>[], page:number, totalItems:number}> {



        const playlistExists = await this.playlistRepository.getPlaylistById(playlistId);
        if (!playlistExists) {
            throw new Error("Playlist does not exist");
        }


        canSeePlaylist(playlistExists.ownerId, playlistExists.visibility,user);

        
        const musics = await this.playlistRepository.getMusicsByPlaylistId(playlistId,page,limit);
        return normalizePaginatedResponse<Partial<Music>>(musics, page);




    }
}

export { GetMusicsByPlaylistId }