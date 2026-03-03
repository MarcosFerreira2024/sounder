import { MusicReaction } from "../../../generated/prisma/enums.js";

interface IMusicActionRepository {
  upsert(musicAction: {
    musicId: string;
    userId: string;
    reaction: MusicReaction;
  }): Promise<void>;

  getInteractedMusicsByUser(
    userId: string,
  ): Promise<{ musicId: string; reaction: MusicReaction }[]>;

  getInteractedMusicsByGenre(
    userId: string,
  ): Promise<{ genre: string; count: number }[]>;
}

export { IMusicActionRepository };
