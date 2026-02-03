import { DailyGameHistory } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { GameHistorySearch, GameHistoryUpdate, IGameHistoryRepository, ResultItem } from "../interfaces/IGameHistoryRepository";

class GameHistoryRepository implements IGameHistoryRepository {

    async createGameHistory(dailyGameId: string, date: Date): Promise<DailyGameHistory> {
       const dailyGameHistory = await prisma.dailyGameHistory.create({

            data: {
                date,
                dailyGameId,

            },
            include: {
                dailyGame: {
                    omit: {
                        id:true,


                    }
                }
            }


        })

        return dailyGameHistory
    }
    async deleteGameHistory(dailyGameId: string): Promise<void> {

        await prisma.dailyGameHistory.deleteMany({
            where: {
                dailyGameId,
            }
        })

        
    }

    async getHistory(
        page?: number,
        limit?: number,
        search?: GameHistorySearch
    ): Promise<ResultItem[]> {
        const result = await prisma.dailyGameHistory.findMany({
            skip: page && limit ? (page - 1) * limit : undefined,
            take: limit,
            where: {
                ...(search?.dailyGameId ? { dailyGameId: search.dailyGameId } : {}),
                ...(search?.date ? { date: search.date } : {}),
                ...(search?.correctAnswer ? { correctAnswer: search.correctAnswer } : {}),
            },
            include: {
                dailyGame: true, 
            },
        });

        return result.map(item => ({
            musicName: item.dailyGame.musicName,
            artistName: item.dailyGame.artistName,
        }));
    }
    async updateGameHistory(dailyGameId: string, data: GameHistoryUpdate): Promise<void> {
        await prisma.dailyGameHistory.updateMany({
            where: {
                dailyGameId,
            },
            data
        })
    }
    
    
}

export { GameHistoryRepository }