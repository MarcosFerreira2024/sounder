import { MusicAlbum } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { albumQueryFilters, IAlbumRepository } from "../interfaces/IAlbumRepository";

class AlbumRepository implements IAlbumRepository {

    async createAlbum(data: { authorId: string; cover: string; name: string; }): Promise<MusicAlbum> {

        const { authorId, cover, name } = data;

        return await prisma.musicAlbum.create({
            data:{
                authorId,
                cover,
                name
            }
        })

    }

    async getAlbumById(albumId: string): Promise<MusicAlbum | null> {

        return await prisma.musicAlbum.findUnique({
            where:{
                id: albumId
            }
        })

        
    }

    async getAlbumByNameAndAuthorId(name: string, authorId: string): Promise<MusicAlbum | null> {
        
        return await prisma.musicAlbum.findFirst({
            where:{
                name,
                authorId
            }
        })

    }


    async getAlbums(page: number, limit: number,albumQueryFilters?:albumQueryFilters): Promise<MusicAlbum[]> {
        

        return await prisma.musicAlbum.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: {
                ...(albumQueryFilters?.name && { name: { contains: albumQueryFilters.name } }),
                ...(albumQueryFilters?.authorId && { authorId: albumQueryFilters.authorId })

            }
        }

    
        
    )
    }
}

export { AlbumRepository };