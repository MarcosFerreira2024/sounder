import { Playlist, PlaylistMusic } from "../../../generated/prisma/client";
import { PlaylistVisibility } from "../../../generated/prisma/enums";
import { prisma } from "../../../libs/prismaClient";
import { IPlaylistRepository, updatePayload } from "../interfaces/IPlaylistRepository";

class PlaylistRepository implements IPlaylistRepository {

    async createPlaylist(userId: string, payload:Partial<{name:string, image:string}>): Promise<Playlist> {
        const playlist = prisma.playlist.create({
            data:{
                ownerId: userId,
                name: payload.name || "New Playlist",
                image: payload.image || null,

                
            },
        })

        return playlist;
        
    }
    async deletePlaylist(playlistId: string): Promise<void> {
        prisma.playlist.delete({
            where:{
                id: playlistId
            }
        })


    }

    async getPlaylistById(playlistId: string): Promise<Playlist | null> {
        
        const playlist = prisma.playlist.findUnique({
            where:{
                id: playlistId
            },
            include:{
                musics: {
                    select:{
                        id: true,
                        music:{
                            select:{
                                id: true,
                            }
                        }
                    },

                }
            }
        })

        return playlist;
    }

    async getMusicsByPlaylistId(playlistId: string): Promise<{id:string,name:string,audio:string}[]> {

        const musics = await prisma.playlistMusic.findMany({
            where:{
                playlistId
            },
            select:{
                music:{
                    select:{
                        id: true,
                        name: true,
                        audio: true
                        
                    }
                }
            }

                

        })

        return musics.map(item => item.music);

    }

    async getPlaylistByUserId(userId: string): Promise<Playlist[]> {

        const playlist = await prisma.playlist.findMany({
            where:{
                ownerId: userId
            }
        })




        return playlist;
        
    }
    async updatePlaylist(playlistId: string, payload:updatePayload): Promise<any> {

        return prisma.playlist.update({
            where:{
                id: playlistId
            }
            ,
            data: payload
        })
        
    }
    async addMusicToPlaylist(playlistId: string, musicId: string) {
        await prisma.$transaction(async (tx) => {
            const lastPosition = await tx.playlistMusic.aggregate({
            where: { playlistId },
            _max: { position: true }
            })

            const position = (lastPosition._max.position ?? 0) + 1

            await tx.playlistMusic.create({
            data: {
                playlistId,
                musicId,
                position
            }
            })
        })
    }

    async removeMusicFromPlaylist(
    playlistId: string,
    musicId: string
    ) {
    await prisma.$transaction(async (tx) => {
        const removed = await tx.playlistMusic.findFirst({
        where: { playlistId, musicId },
        select: { position: true }
        })

        if (!removed) return

        await tx.playlistMusic.delete({
        where: {
            playlistId_musicId: { playlistId, musicId }
        }
        })

        await tx.playlistMusic.updateMany({
        where: {
            playlistId,
            position: { gt: removed.position }
        },
        data: {
            position: { decrement: 1 }
        }
        })
    })
    }
}

export { PlaylistRepository };