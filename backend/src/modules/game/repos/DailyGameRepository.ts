import { DailyGame } from "../../../generated/prisma/client.js";
import { prisma } from "../../../libs/prismaClient.js";
import { getTodayRange } from "../../../shared/helpers/getTodayRange.js";
import {
  GameCreationArgs,
  IDailyGameRepository,
} from "../interfaces/IDailyGameRepository.js";

class DailyGameRepository implements IDailyGameRepository {
  async createDailyGame(data: GameCreationArgs): Promise<DailyGame> {
    return await prisma.dailyGame.create({
      data: {
        artistName: data.correctAnswer,
        musicName: data.musicName,
        audio: data.audio,
        blur100: data.blur100,
        blur75: data.blur75,
        blur50: data.blur50,
        blur25: data.blur25,
        correctAnswer: data.correctAnswer,
        date: data.date,
        originalImage: data.originalImage,
      },
    });
  }

  getToday(): Promise<DailyGame | null> {
    const { start, end } = getTodayRange();

    return prisma.dailyGame.findFirst({
      where: {
        date: {
          lt: end,
          gte: start,
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  async deleteDailyGame(dailyGameId: string): Promise<void> {
    await prisma.dailyGame.deleteMany({
      where: {
        id: dailyGameId,
      },
    });
  }
}

export { DailyGameRepository };
