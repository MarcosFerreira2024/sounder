import { User } from "better-auth/types";
import { PlaylistVisibility } from "../../../generated/prisma/enums";
import { IPlaylistRepository, updatePayload } from "../interfaces/IPlaylistRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePlaylist {
    constructor(@inject("PlaylistRepository")private playlistRepository: IPlaylistRepository) {}

    async execute(playlistId: string, payload:updatePayload,user:User): Promise<{id:string, name:string, visibility:PlaylistVisibility}> {


        const playlistExists = await this.playlistRepository.getPlaylistById(playlistId);


        if (!playlistExists) {
            throw new Error("Playlist does not exist, cannot update");
        }

        const hasPermissions = user.id === playlistExists.ownerId;


        if (!hasPermissions) {
            throw new Error("You do not have permission to update this playlist");
        }

    
        const updatedPlaylist = await this.playlistRepository.updatePlaylist(playlistId, payload);
        return updatedPlaylist;
    }
}

export { UpdatePlaylist }