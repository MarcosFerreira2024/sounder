import { Music, Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../../libs/prismaClient.js";
import {
  IMusicRepository,
  musicQueryFilters,
  MusicWithCover,
} from "../interfaces/IMusicRepository.js";

class MusicRepository implements IMusicRepository {
  async getRandomMusic(exclude: string[]): Promise<MusicWithCover | null> {
    const availableMusics = await prisma.music.findMany({
      where: {
        name: { notIn: exclude },
      },
      include: {
        album: {
          select: {
            cover: true,
          },
        },
      },
    });

    if (availableMusics.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * availableMusics.length);
    return availableMusics[randomIndex];
  }

  async getMusicById(musicId: string): Promise<MusicWithCover | null> {
    const music = await prisma.music.findUnique({
      where: {
        id: musicId,
      },
      include: {
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        album: {
          select: {
            cover: true,
          },
        },
      },
    });

    if (!music) return null;

    const withCover = {
      ...music,
      genres: music?.genres.map((genre) => genre.genre.name),
      cover: music?.album?.cover,
    };

    return withCover;
  }

  async updateMany(
    albumId: string,
    data: Partial<{
      name: string;
      audio: string;
      artistId: string;
      albumId: string;
    }>,
  ): Promise<void> {
    await prisma.music.updateMany({
      where: {
        albumId,
      },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.audio && { audio: data.audio }),
        ...(data.artistId && { artistId: data.artistId }),
        ...(data.albumId !== undefined && { albumId: data.albumId }),
      },
    });
  }

  async deleteByAlbumId(albumId: string): Promise<void> {
    await prisma.music.deleteMany({
      where: {
        albumId: albumId,
      },
    });
  }

  async addLike(musicId: string): Promise<void> {
    await prisma.music.update({
      where: {
        id: musicId,
      },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });
  }
  async createMusic(data: {
    name: string;
    audio: string;
    artistId: string;
    lyrics: string;
    genres: string[];
    albumId: string;
  }): Promise<Music> {
    const music = await prisma.music.create({
      data: {
        name: data.name,
        audio: data.audio,
        artistId: data.artistId,
        albumId: data.albumId,
        lyrics: data.lyrics,
        genres: {
          create: data.genres.map((genre) => ({
            genre: {
              connectOrCreate: {
                where: { name: genre },
                create: { name: genre },
              },
            },
          })),
        },
      },
      include: {
        genres: {
          select: {
            genre: true,
          },
        },
      },
    });

    return music;
  }
  async deleteMusic(musicId: string): Promise<void> {
    await prisma.$transaction([
      prisma.musicGenre.deleteMany({ where: { musicId } }),
      prisma.playlistMusic.deleteMany({ where: { musicId } }),
      prisma.music.delete({ where: { id: musicId } }),
    ]);
  }

  async getMusics(
    search?: musicQueryFilters,
    page?: number,
    limit?: number,
    excludeMusics?: string[],
    operator: "AND" | "OR" = "AND",
  ): Promise<MusicWithCover[]> {
    const filters: Prisma.MusicWhereInput[] = [];

    if (search?.name) {
      filters.push({
        name: { contains: search.name, mode: "insensitive" },
      });
    }

    if (search?.genresName) {
      filters.push({
        genres: {
          some: {
            genre: {
              name: { in: search.genresName },
            },
          },
        },
      });
    }

    if (search?.audio) {
      filters.push({
        audio: { equals: search.audio },
      });
    }

    if (search?.id) {
      filters.push({
        id: search.id,
      });
    }

    if (search?.artistId) {
      filters.push({
        artistId: search.artistId,
      });
    }

    if (search?.authorName) {
      filters.push({
        artist: {
          user: {
            name: {
              contains: search.authorName,
              mode: "insensitive",
            },
          },
        },
      });
    }

    const where: Prisma.MusicWhereInput = {};

    if (excludeMusics?.length) {
      where.id = { notIn: excludeMusics };
    }

    if (filters.length) {
      where[operator] = filters;
    }

    const musics = await prisma.music.findMany({
      where,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit ?? undefined,
      include: {
        album: {
          select: {
            cover: true,
          },
        },
      },
    });

    const withCover: MusicWithCover[] = musics.map((music) => ({
      id: music.id,
      name: music.name,
      albumId: music.albumId,
      artistId: music.artistId,
      audio: music.audio,
      likeCount: music.likeCount,
      lyrics: music.lyrics,
      cover: music.album?.cover,
    }));

    return withCover;
  }

  async removeLike(musicId: string): Promise<void> {
    await prisma.music.update({
      where: {
        id: musicId,
        likeCount: { gt: 0 },
      },
      data: {
        likeCount: {
          decrement: 1,
        },
      },
    });
  }

  async updateMusic(
    musicId: string,
    data: Partial<{ name: string; audio: string; artistId: string }>,
  ): Promise<Music> {
    return await prisma.music.update({
      where: {
        id: musicId,
      },
      data: {
        ...data,
      },
    });
  }

  async assignMusicToAlbum(musicId: string, albumId: string): Promise<Music> {
    return await prisma.music.update({
      where: {
        id: musicId,
      },
      data: {
        album: {
          connect: {
            id: albumId,
          },
        },
      },
    });
  }
}

export { MusicRepository };
