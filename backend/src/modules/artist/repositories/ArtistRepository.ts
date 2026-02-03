import { ArtistAccountStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../libs/prismaClient";
import { artistsQueryFilters, IArtistRepository } from "../interfaces/IArtistRepository";

class ArtistRepository implements IArtistRepository {
    async assignUserAsArtist(userId: string): Promise<void> {
        await prisma.artist.update({where: {userId}, data: {
            status: "ACTIVE"
        }})
        
    }

    async createArtist(userId: string): Promise<void> {
        await prisma.artist.create({data: {userId}})
    }

    async getArtistById(artistId: string): Promise<{artistId:string; userId: string; name: string; status:ArtistAccountStatus } | null> {
        const artist = await prisma.artist.findUnique({
            where: {
                id: artistId
            },
            select: {
                id: true,
                status: true,
                user: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
        })

        if(!artist) return null

        return {
            artistId: artist.id,
            userId: artist.user.id,
            name: artist.user.name,
            status: artist.status,
   
        }
    }

    async getArtists( search?: artistsQueryFilters,page?: number, limit?: number): Promise<{artistId: string; userId: string; name: string; }[]> {
        const artist = await prisma.artist.findMany({
            where:{
                ...(search?.name &&  { user: { name: { contains: search.name } } }),
                ...(search?.id &&  { user: { id: search.id } }),
                ...(search?.musicName &&  { music:{some:{name:{contains:search.musicName}}}}),
                ...(search?.albumName &&  { albums:{some:{name:{contains:search.albumName}}}}),
                ...(search?.id &&  { user: { id: search.id } }),


            },
            select: {
                id: true,
                user: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
            skip: page && limit && (page - 1) * limit,
            take: limit && limit  ,
            }
        )

        return artist.map(artist => ({artistId: artist.id, userId: artist.user.id, name: artist.user.name }))



    }
}

export { ArtistRepository }