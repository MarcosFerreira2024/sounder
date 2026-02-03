import { DailyGameHistory } from "../../../generated/prisma/client"

type GameHistorySearch = {
    date?: Date,
    gameModeName?: string,
    correctAnswer?: string,
    dailyGameId?: string
}

type GameHistoryUpdate = {
    date: Date, 
    correctAnswer: string, 
    dailyGameId: string,
    id:string 
}

type DailyGameInfo = {
    date: Date;
    originalImage: string;
    blur100: string;
    blur75: string;
    blur50: string;
    blur25: string;
    audio: string;
    musicName: string;
    artistName: string;
    correctAnswer: string;
};

type ResultItem = {
    musicName: string;
    artistName: string;
};



interface IGameHistoryRepository {
    getHistory(page?: number, limit?: number, 
        search?: 
        GameHistorySearch)
    : Promise<ResultItem[]>

    createGameHistory(dailyGameId: string, date: Date): Promise<DailyGameHistory>

    updateGameHistory(dailyGameId: string, data: 
        GameHistoryUpdate)
    : Promise<void>

    deleteGameHistory(dailyGameId: string): Promise<void>

}

export { IGameHistoryRepository, GameHistorySearch, GameHistoryUpdate, ResultItem , DailyGameInfo}