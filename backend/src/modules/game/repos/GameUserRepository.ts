import { UserGameStatus } from "../../../generated/prisma/client.js";
import { prisma } from "../../../libs/prismaClient.js";
import { GameUserUpdateStats, IGameUserRepository } from "../interfaces/IGameUserRepository.js";

class GameUserRepository implements IGameUserRepository {

    async createStats(userId: string, gameMode: string): Promise<UserGameStatus> {
        

        const stats =await prisma.userGameStatus.create({
            data: {
                userId,
                gamemodeId:gameMode
            }
        })

        return stats
    }

    async getUserStats(userId: string, gameMode: string): Promise<UserGameStatus | null> {
        const stats = await prisma.userGameStatus.findUnique({
            where: {
                gamemodeId_userId: {
                    gamemodeId: gameMode,
                    userId
                }
            }
        })

        return stats



    }

    async updateStats(
        userId: string,
        gamemodeId: string,
        data: GameUserUpdateStats
        ): Promise<UserGameStatus> {
        return await prisma.userGameStatus.update({
            where: {
            gamemodeId_userId: {
                gamemodeId,
                userId
            }
            },
            data: {
            wins: data.increment?.wins !== undefined
                ? { increment: data.increment.wins }
                : undefined,

            loses: data.increment?.loses !== undefined
                ? { increment: data.increment.loses }
                : undefined,

            matches: data.increment?.matches !== undefined
                ? { increment: data.increment.matches }
                : undefined,

            streak: data.set?.streak !== undefined
                ? { set: data.set.streak }
                : data.increment?.streak !== undefined
                ? { increment: data.increment.streak }
                : undefined,

            timePlayed: data.increment?.timePlayed !== undefined
                ? { increment: data.increment.timePlayed }
                : undefined,

            winPercent: data.set?.winPercent !== undefined
                ? { set: data.set.winPercent }
                : undefined
            }

        })
        }


}

export { GameUserRepository }