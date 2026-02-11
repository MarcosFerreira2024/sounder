import { Music } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import {
  IMusicRepository,
  musicQueryFilters,
  MusicWithCover,
} from "../interfaces/IMusicRepository";

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

  async getMusicById(musicId: string): Promise<Music | null> {
    const music = await prisma.music.findUnique({
      where: {
        id: musicId,
      },
      include: {
        genres: true,
      },
    });

    return music;
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
  ): Promise<MusicWithCover[]> {
    return await prisma.music.findMany({
      where: {
        ...(search?.name && { name: { contains: search.name } }),
        ...(search?.audio && { audio: { contains: search.audio } }),
        ...(search?.id && { id: search.id }),
        ...(search?.artistId && { artistId: search.artistId }),

        artist: {
          user: {
            name: {
              contains: search?.authorName,
            },
          },
        },
      },

      skip: page && limit && (page - 1) * limit,
      take: limit && limit,

      include: {
        album: {
          select: {
            cover: true,
          },
        },
      },
    });
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
