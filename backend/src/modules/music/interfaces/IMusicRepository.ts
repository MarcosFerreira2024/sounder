import { Music } from "../../../generated/prisma/client";

export type musicQueryFilters = {
    name?: string;
    audio?: string;
    id?: string;
    authorId?: string;
    authorName?: string;

}


interface IMusicRepository {
    getMusicById(musicId: string): Promise<Music | null>;

    getMusics(page: number, limit: number, search?: musicQueryFilters): Promise<Music[]>;

    createMusic(data: { name: string; audio: string; authorId: string, lyrics: string,genres:string[], albumId: string}): Promise<Music>;

    addLike(musicId: string): Promise<void>;

    removeLike(musicId: string): Promise<void>;

    updateMusic(musicId: string, data: Partial<{ name: string; audio: string; authorId: string }>): Promise<Music>;

    deleteMusic(musicId: string): Promise<void>;


}

export { IMusicRepository };