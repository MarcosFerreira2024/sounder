import { Music } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { IMusicRepository, musicQueryFilters } from "../interfaces/IMusicRepository";

class MusicRepository implements IMusicRepository {

    async getMusicById(musicId: string): Promise<Music | null> {

        const music = await prisma.music.findUnique({
            where:{
                id: musicId
            }
        })

        return music

    }

    async addLike(musicId: string): Promise<void> {
        await prisma.music.update({
            where:{
                id: musicId
            },
            data: {
                likeCount: {
                    increment: 1
                }
            }
        })
        
    }
    async createMusic(data: { name: string; audio: string; authorId: string, lyrics: string,genres: string[], albumId: string}): Promise<Music> {

        const music = await prisma.music.create({
            data:{
                name: data.name,
                audio: data.audio,
                authorId: data.authorId,
                albumId: data.albumId,
                lyrics: data.lyrics,
                genres: {
                create: data.genres.map(genre => ({
                    genre: {
                    connectOrCreate: {
                        where: { name: genre},
                        create: { name: genre}
                    }
                    }
                }))
                }
            }
        })

        return music;
        
    }
    async deleteMusic(musicId: string): Promise<void> {

        await prisma.music.delete({
            where:{
                id: musicId
            }
        })
        
    }
    async getMusics(page: number, limit: number, search?: musicQueryFilters): Promise<Music[]> {

        return await prisma.music.findMany({
            where:{
                
                ...(search?.name &&  { name: { contains: search.name } }),
                ...(search?.audio &&  { audio: { contains: search.audio } }),
                ...(search?.id &&  { id: search.id }),
                ...(search?.authorId &&  { authorId: search.authorId }),
                ...(search?.authorName &&  { author: { name: { contains: search.authorName  } } }),
            },

            skip: (page - 1) * limit,
            take: 10,


        })

        
    }



    async removeLike(musicId: string): Promise<void> {

        await prisma.music.update({
                where:{
                    id: musicId
                },
                data: {
                    likeCount: {
                        decrement: 1
                    }
                }
            })
        
    }

    async updateMusic(musicId: string, data: Partial<{ name: string; audio: string; authorId: string; }>): Promise<Music> {
        return await prisma.music.update({
            where:{
                id: musicId
            },
            data: {
                ...data
            }
        })
    }

}

export {MusicRepository}