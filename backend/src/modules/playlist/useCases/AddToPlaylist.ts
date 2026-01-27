import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { User } from "../../../generated/prisma/client";
import { IPlaylistRepository } from "../interfaces/IPlaylistRepository";

@injectable()
class AddFromPlaylist {
    
    constructor (
    @inject("PlaylistRepository") private playlistRepository: IPlaylistRepository, 
    @inject("MusicRepository") private musicRepository: IMusicRepository, 
    @inject("UserRepository") private userRepository: IUserRepository) {}

    async execute (playlistId: string, musicId: string, user: User) {

        const playlist = await this.playlistRepository.getPlaylistById(playlistId);
        if (!playlist) throw new Error("Playlist does not exist");

        const hasPermissions = playlist.ownerId === user.id ;
        if (!hasPermissions) throw new Error("You do not have permission to change musics from this playlist");

        const music = await this.musicRepository.getMusicById(musicId);
        if (!music) throw new Error("Music does not exist");






        await this.playlistRepository.addMusicToPlaylist(playlistId, musicId);

    }
}

export { AddFromPlaylist }