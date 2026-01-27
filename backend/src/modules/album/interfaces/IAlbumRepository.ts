import { MusicAlbum } from "../../../generated/prisma/client";


export type albumQueryFilters = {
    authorId?:string;
    name?:string;

}

interface IAlbumRepository {
    getAlbumByNameAndAuthorId(name: string, authorId: string): Promise<MusicAlbum | null>;
    createAlbum(data: { authorId: string; cover: string; name: string }): Promise<MusicAlbum>
    getAlbumById(albumId: string): Promise<MusicAlbum | null>
    delete(albumId: string): Promise<void>;
    update(albumId: string, data: { cover?: string; name?: string; authorId?: string }): Promise<MusicAlbum | null>;    

    getAlbums(page: number, limit: number, search?:albumQueryFilters): Promise<MusicAlbum[]>;
}

export { IAlbumRepository };