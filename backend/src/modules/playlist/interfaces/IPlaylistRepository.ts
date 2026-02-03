import { Playlist } from "../../../generated/prisma/client";
import { PlaylistVisibility } from "../../../generated/prisma/enums";


export type updatePayload = Partial<{image:string,name:string,visibility:PlaylistVisibility}>;


interface IPlaylistRepository {
    getPlaylistByUserId(userId: string, page?: number, limit?: number): Promise<Playlist[]>;
    getPlaylistById(playlistId: string): Promise<Playlist | null>;
    updatePlaylist(playlistId: string, payload:updatePayload): Promise<Playlist>;
    getMusicsByPlaylistId(playlistId: string, page?: number, limit?: number): Promise<{id:string,name:string,audio:string}[]>;


    createPlaylist(userId: string, payload:Partial<{name:string, image:string}>): Promise<Playlist>;
    deletePlaylist(playlistId: string): Promise<void>;


    removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<void>;
    addMusicToPlaylist(playlistId: string, musicId: string): Promise<void>;
}

export { IPlaylistRepository };