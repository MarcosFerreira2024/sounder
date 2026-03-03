import { connect } from "http2";
import { prisma } from "../../../libs/prismaClient.js";
import { GameSessionCreationArgs, GameSessionUpdate, IGameSessionRepository } from "../interfaces/IGameSessionRepository.js";
import { GameSession } from "../../../generated/prisma/client.js";

class GameSessionRepository implements IGameSessionRepository {
    async createSession(data: GameSessionCreationArgs): Promise<GameSession> {


        return await prisma.gameSession.create({
            data: {
                userId: data.userId,
                gameId: data.gameId,
                status: "IN_PROGRESS",
                tries: 0
            }
        })
        
    }

    async deleteSession(sessionId: string): Promise<void> {
        await prisma.gameSession.delete({
            where: {
                id: sessionId
            }
        })
    }

    async findSession(gameId: string, userId: string): Promise<GameSession | null> {

        const gameSession = await prisma.gameSession.findUnique({
            where: {
                userId_gameId: {
                    gameId,
                    userId
                }
            }
        })

        return gameSession

        
    }
        
    async updateSession(sessionId: string, data: Partial<GameSessionUpdate>): Promise<GameSession> {

        return await prisma.gameSession.update({
            where: {
                id: sessionId
            },
            data
        })
        
    }

}

export { GameSessionRepository }