import { Game } from "../../../generated/prisma/client.js";

interface IGameRepository {
    create(dailyGameId: string,gamemodeId: string): Promise<Game>;
    findByDailyId(dailyGameId: string): Promise<Game | null>;
    getToday(): Promise<Game[]>
    getById(gameId:string):Promise<Game | null>
}

export { IGameRepository }