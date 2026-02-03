import { ArtistAccountStatus } from "../../../generated/prisma/enums";


type artistsQueryFilters = {
    id: string | undefined,
    name: string | undefined,
    musicName: string | undefined,
    albumName: string | undefined,
}


interface IArtistRepository {

    assignUserAsArtist(userId: string): Promise<void>

    getArtists( search?: artistsQueryFilters,page?: number, limit?: number): Promise<{userId:string, artistId: string; name: string; }[]>

    getArtistById(artistId: string): Promise<{userId: string; artistId: string;  name: string; status:ArtistAccountStatus } | null>

    createArtist(userId: string): Promise<void>


    



}

export { IArtistRepository, artistsQueryFilters }