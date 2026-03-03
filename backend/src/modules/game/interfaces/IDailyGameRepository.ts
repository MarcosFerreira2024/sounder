import { DailyGame } from "../../../generated/prisma/client.js"

type GameCreationArgs = {
    originalImage: string;
    musicName: string;
    correctAnswer: string;
    blur100: string;
    blur75: string;
    blur50: string;
    blur25: string;
    date: Date;
    audio: string;
}


interface IDailyGameRepository {
    getToday(): Promise<DailyGame | null>
    createDailyGame(data: GameCreationArgs): Promise<DailyGame>
    deleteDailyGame(dailyGameId: string): Promise<void>
}

export { IDailyGameRepository, GameCreationArgs }