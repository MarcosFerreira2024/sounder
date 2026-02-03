import { DailyGame } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { GameCreationArgs, IDailyGameRepository } from "../interfaces/IDailyGameRepository";

class DailyGameRepository implements IDailyGameRepository{

    async createDailyGame(data: GameCreationArgs): Promise<DailyGame> {

        return await prisma.dailyGame.create( {
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
                originalImage: data.originalImage
            }   
        })
        
    }

    getToday(): Promise<DailyGame | null> {
    return prisma.dailyGame.findFirst({
        where: {
        date: {
            lt: new Date()
        }
        },
        orderBy: {
        date: 'desc'
        }
    })
    }

    async deleteDailyGame(dailyGameId: string): Promise<void> {
         await prisma.dailyGame.deleteMany({
            where: {
                id: dailyGameId
            }
        })
    }

}

export { DailyGameRepository }