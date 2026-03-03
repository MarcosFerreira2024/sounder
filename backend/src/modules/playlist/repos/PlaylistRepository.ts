import { Playlist, PlaylistVisibility } from "../../../generated/prisma/client.js";
import { prisma } from "../../../libs/prismaClient.js";
import {
  MusicWithCover,
  PlaylistMusicItem,
} from "../../music/interfaces/IMusicRepository.js";
import {
  IPlaylistRepository,
  updatePayload,
} from "../interfaces/IPlaylistRepository.js";

class PlaylistRepository implements IPlaylistRepository {
  async createPlaylist(
    userId: string,
    payload: Partial<{ name: string; image: string }>,
  ): Promise<Playlist> {
    const playlist = await prisma.playlist.create({
      data: {
        ownerId: userId,
        name: payload.name || "New Playlist",
        image: payload.image || null,
      },
    });

    return playlist;
  }

  async getPlaylists(
    search?: Partial<{
      name: string;
      visibility: PlaylistVisibility;
      ownerId: string;
    }>,
    page?: number,
    limit?: number,
  ): Promise<Playlist[]> {
    return await prisma.playlist.findMany({
      where: {
        ...(search?.name && { name: { contains: search.name } }),
        ...(search?.visibility && { visibility: search.visibility }),
        ...(search?.ownerId && { ownerId: search.ownerId }),
      },
      skip: page && limit && (page - 1) * limit,
      take: limit,
    });
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.playlistMusic.deleteMany({
        where: {
          playlistId,
        },
      });

      await tx.playlist.delete({
        where: {
          id: playlistId,
        },
      });
    });
  }

  async getPlaylistById(playlistId: string): Promise<Playlist | null> {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        musics: {
          select: {
            id: true,
            music: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return playlist;
  }

  async getMusicsByPlaylistId(
    playlistId: string,
    page?: number,
    limit?: number,
  ): Promise<PlaylistMusicItem[]> {
    const musics = await prisma.playlistMusic.findMany({
      where: {
        playlistId,
      },
      select: {
        music: {
          select: {
            id: true,
            name: true,
            genres: {
              select: {
                genre: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            audio: true,
            lyrics: true,
            likeCount: true,
            album: {
              select: {
                cover: true,
              },
            },
            artist: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },

      skip: page && limit && (page - 1) * limit,
      take: limit && limit,

      orderBy: {
        position: "asc",
      },
    });

    return musics.map((item) => {
      return {
        id: item.music.id,
        name: item.music.name,
        audio: item.music.audio,
        likeCount: item.music.likeCount,
        cover: item.music.album?.cover,
        lyrics: item.music.lyrics,
        author: item.music.artist.user.name,
        genres: item.music.genres.map((genre) => genre.genre.name),
      };
    });
  }

  async getPlaylistByUserId(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<Playlist[]> {
    return await prisma.playlist.findMany({
      where: {
        ownerId: userId,
      },
      skip: page && limit && (page - 1) * limit,
      take: limit,
    });
  }
  async updatePlaylist(
    playlistId: string,
    payload: updatePayload,
  ): Promise<any> {
    return await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: payload,
    });
  }
  async addMusicToPlaylist(playlistId: string, musicId: string) {
    await prisma.$transaction(async (tx) => {
      const lastPosition = await tx.playlistMusic.aggregate({
        where: { playlistId },
        _max: { position: true },
      });

      const position = (lastPosition._max.position ?? 0) + 1;

      await tx.playlistMusic.create({
        data: {
          playlistId,
          musicId,
          position,
        },
      });
    });
  }

  async removeMusicFromPlaylist(playlistId: string, musicId: string) {
    await prisma.$transaction(async (tx) => {
      const removed = await tx.playlistMusic.findFirst({
        where: { playlistId, musicId },
        select: { position: true },
      });

      if (!removed) return;

      await tx.playlistMusic.delete({
        where: {
          playlistId_musicId: { playlistId, musicId },
        },
      });

      await tx.playlistMusic.updateMany({
        where: {
          playlistId,
          position: { gt: removed.position },
        },
        data: {
          position: { decrement: 1 },
        },
      });
    });
  }
}

export { PlaylistRepository };
