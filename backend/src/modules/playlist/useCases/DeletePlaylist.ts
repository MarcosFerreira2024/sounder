import { User } from "better-auth/types";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeletePlaylist {
    constructor(@inject("PlaylistRepository") private playlistRepository: IPlaylistRepository) {}

    async execute( playlistId: string,user:User): Promise<void> {


        const playlistExists = await this.playlistRepository.getPlaylistById(playlistId);

        if (!playlistExists) {
            throw new Error("Playlist does not exist, cannot delete");
        }

        const hasPermissions = user.id === playlistExists.ownerId;

        if (!hasPermissions) {
            throw new Error("You do not have permission to delete this playlist");
        }

    
       await this.playlistRepository.deletePlaylist(playlistId);
    }
}

export { DeletePlaylist }