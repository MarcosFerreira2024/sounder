import { Music } from "../../../generated/prisma/client";

export type musicQueryFilters = {
    name?: string;
    audio?: string;
    id?: string;
    artistId?: string;
    authorName?: string;

}

export type MusicWithCover = Music & {album: {
        cover: string;
    } | null; }



interface IMusicRepository {
    getMusicById(musicId: string): Promise<Music | null>;

    getRandomMusic(exclude: string[]): Promise<MusicWithCover | null>;

    deleteByAlbumId(albumId: string): Promise<void>;

    updateMany(albumId: string, data: Partial<{ name: string; audio: string; artistId: string,albumId: string | null }>): Promise<void>

    getMusics( search?: musicQueryFilters,page?: number, limit?: number): Promise<Music[]>;

    createMusic(data: { name: string; audio: string; artistId: string, lyrics: string,genres:string[], albumId: string}): Promise<Music>;

    addLike(musicId: string): Promise<void>;

    removeLike(musicId: string): Promise<void>;


    updateMusic(musicId: string, data: Partial<{ name: string; audio: string; artistId: string,albumId: string }>): Promise<Music>;

    deleteMusic(musicId: string): Promise<void>;

    assignMusicToAlbum(musicId:string,albumId:string):Promise<Music>


}

export { IMusicRepository };