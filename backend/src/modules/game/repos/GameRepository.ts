import { Game } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { getTodayRange } from "../../../shared/helpers/getTodayRange";
import { IGameRepository } from "../interfaces/IGameRepository";

class GameRepository implements IGameRepository {

    async create(dailyGameId: string, gamemodeId: string): Promise<Game> {

        return await prisma.game.create({
            data:{
                dailyGameId,
                gamemodeId
            }
        })

    }

    async findByDailyId(dailyGameId: string): Promise<Game | null> {

        return await  prisma.game.findFirst({
            where: {
                dailyGameId
            }
        })
        
    }

    async getToday(): Promise<Game[]> {
    const { start, end } = getTodayRange()

    return prisma.game.findMany({
        where: {
            dailyGame: {
                date: {
                gte: start,
                lte: end
                }
            }
            }
        })
    }

    async getById(gameId:string): Promise<Game | null> {
        return await prisma.game.findUnique({
            where:{
                id:gameId
            }
        })
    }





}

export { GameRepository }