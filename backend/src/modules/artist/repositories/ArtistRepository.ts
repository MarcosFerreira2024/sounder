import { ArtistAccountStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../../libs/prismaClient";
import {
  artistsQueryFilters,
  IArtistRepository,
} from "../interfaces/IArtistRepository";

class ArtistRepository implements IArtistRepository {
  async assignUserAsArtist(userId: string): Promise<void> {
    await prisma.artist.update({
      where: { userId },
      data: {
        status: "ACTIVE",
      },
    });
  }

  async createArtist(userId: string): Promise<void> {
    await prisma.artist.create({ data: { userId } });
  }

  async getArtistById(artistId: string): Promise<{
    artistId: string;
    userId: string;
    name: string;
    status: ArtistAccountStatus;
  } | null> {
    const artist = await prisma.artist.findUnique({
      where: {
        id: artistId,
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!artist) return null;

    return {
      artistId: artist.id,
      userId: artist.user.id,
      name: artist.user.name,
      status: artist.status,
    };
  }

  async getArtists(
    search?: artistsQueryFilters,
    page?: number,
    limit?: number,
    matchType?: "startsWith" | "contains",
  ): Promise<
    {
      artistId: string;
      userId: string;
      name: string;
      image: string | null;
      about: string | null;
    }[]
  > {
    if (!matchType) matchType = "contains";

    const artist = await prisma.artist.findMany({
      where: {
        ...(search?.name && {
          user: {
            name:
              matchType === "contains"
                ? { contains: search.name, mode: "insensitive" }
                : { startsWith: search.name, mode: "insensitive" },
          },
        }),
        ...(search?.id && { user: { id: search.id } }),
        ...(search?.musicName && {
          music: {
            some: {
              name:
                matchType === "contains"
                  ? { contains: search.musicName, mode: "insensitive" }
                  : { startsWith: search.musicName, mode: "insensitive" },
            },
          },
        }),
        ...(search?.albumName && {
          albums: {
            some: {
              name:
                matchType === "contains"
                  ? { contains: search.albumName, mode: "insensitive" }
                  : { startsWith: search.albumName, mode: "insensitive" },
            },
          },
        }),
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            about: true,
            image: true,
          },
        },
      },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
    });

    return artist.map((artist) => ({
      artistId: artist.id,
      userId: artist.user.id,
      name: artist.user.name,
      about: artist.user.about,
      image: artist.user.image,
    }));
  }
}

export { ArtistRepository };
