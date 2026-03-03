import { GameStatus, GameSession } from "../../../generated/prisma/client.js"


type GameSessionUpdate ={
    userId?: string;
    gameId?: string;
    status?: GameStatus;
    tries?: number;
    correctAnswer?: boolean | null
} 

type GameSessionCreationArgs = {
    userId: string;
    gameId: string;
}




interface IGameSessionRepository {
    findSession(gameId: string, userId: string): Promise<GameSession | null>
    createSession(data: GameSessionCreationArgs): Promise<GameSession>
    updateSession(sessionId: string, 
    data:GameSessionUpdate): Promise<GameSession>
    deleteSession(sessionId: string): Promise<void>
}

export { IGameSessionRepository , GameSessionUpdate, GameSessionCreationArgs}