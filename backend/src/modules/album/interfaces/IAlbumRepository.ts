import { Album } from "../../../generated/prisma/client";


export type albumQueryFilters = {
    authorId?:string;
    name?:string;

}

export type AlbumWithAuthor = {
  id: string;
  name: string;
  cover: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    user: {
      name: string;
    };
  };
} | null;


interface IAlbumRepository {
    getAlbumByNameAndAuthorId(name: string, authorId: string): Promise<Album | null>;
    createAlbum(data: { authorId: string; cover: string; name: string }): Promise<Album>
    getAlbumById(albumId: string): Promise<AlbumWithAuthor | null>
    delete(albumId: string): Promise<void>;
    update(albumId: string, data: { cover?: string; name?: string; authorId?: string }): Promise<Album | null>;    

    getAlbums( search?:albumQueryFilters,page?: number, limit?: number,): Promise<Album[]>;

}

export { IAlbumRepository };