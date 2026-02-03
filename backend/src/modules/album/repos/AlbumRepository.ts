import { Album } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { albumQueryFilters, AlbumWithAuthor, IAlbumRepository } from "../interfaces/IAlbumRepository";

class AlbumRepository implements IAlbumRepository {

    async createAlbum(data: { authorId: string; cover: string; name: string; }): Promise<Album> {


        const { authorId, cover, name } = data;

        return await prisma.album.create({
            data:{
                authorId,
                cover,
                name
            }
        })

    }
    async delete(albumId: string): Promise<void> {
        await prisma.album.deleteMany({
            where: {
                id: albumId
            }

            
        })
    }

    async update(albumId: string, data: { cover?: string; name?: string; authorId?: string; }): Promise<Album | null> {

        return await prisma.album.update({
            where: {
                id: albumId,

            },
            data:{
                name: data.name,
                cover: data.cover,
                authorId: data.authorId
                
            }
        })
    }

    async getAlbumById(albumId: string): Promise<AlbumWithAuthor | null> {

        const album = await prisma.album.findUnique({
            where:{
                id: albumId
            },
            include: {
                author: {
                    select: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return album

        
    }

    async getAlbumByNameAndAuthorId(name: string, authorId: string): Promise<Album | null> {
        
        return await prisma.album.findFirst({
            where:{
                name,
                authorId
            }
        })

    }


    async getAlbums(albumQueryFilters?:albumQueryFilters,page?: number, limit?: number): Promise<Album[]> {
        

        return await prisma.album.findMany({
            take: limit && limit,
            skip: page && limit && (page - 1) * limit,
            where: {
                ...(albumQueryFilters?.name && { name: { contains: albumQueryFilters.name } }),
                ...(albumQueryFilters?.authorId && { authorId: albumQueryFilters.authorId })
                

            }
        }

    
        
    )
    }
}

export { AlbumRepository };