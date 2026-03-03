import { MusicReaction } from "../../../generated/prisma/enums.js";
import { prisma } from "../../../libs/prismaClient.js";
import { IMusicActionRepository } from "../interfaces/IMusicActionRepository.js";

class MusicActionRepository implements IMusicActionRepository {
  async upsert(musicAction: {
    musicId: string;
    userId: string;
    reaction: MusicReaction;
  }): Promise<void> {
    await prisma.musicAction.upsert({
      where: {
        musicId_userId: {
          musicId: musicAction.musicId,
          userId: musicAction.userId,
        },
      },
      create: {
        musicId: musicAction.musicId,
        userId: musicAction.userId,
        reaction: musicAction.reaction,
      },
      update: {
        reaction: musicAction.reaction,
      },
    });
  }

  async getInteractedMusicsByGenre(
    userId: string,
  ): Promise<{ genre: string; count: number }[]> {
    const grouped = await prisma.musicGenre.groupBy({
      by: ["genreId"],

      where: {
        music: {
          actions: {
            some: {
              userId,
            },
          },
        },
      },

      _count: {
        genreId: true,
      },

      orderBy: {
        _count: {
          genreId: "desc",
        },
      },
    });

    const genres = await prisma.genre.findMany({
      where: {
        id: {
          in: grouped.map((g) => g.genreId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return grouped.map((g) => ({
      genre: genres.find((genre) => genre.id === g.genreId)?.name ?? 'Unknown',
      count: g._count.genreId,
    }));
  }

  async getInteractedMusicsByUser(
    userId: string,
  ): Promise<{ musicId: string; reaction: MusicReaction }[]> {
    const interactedMusics = await prisma.musicAction.findMany({
      where: {
        userId,
      },
      select: {
        musicId: true,
        reaction: true,
      },
    });

    return interactedMusics;
  }
}

export { MusicActionRepository };
