import { inject, injectable } from "tsyringe";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository";


@injectable()
class DeleteDailyGame {
    constructor(@inject("DailyGameRepository") private dailyGameRepository: IDailyGameRepository) {}


    async execute(dailyGameId: string): Promise<void> {


        const game = await this.dailyGameRepository.getToday()

        if(game?.id !== dailyGameId) throw new Error("Daily game not found")

        await this.dailyGameRepository.deleteDailyGame(dailyGameId)
    }
}

export { DeleteDailyGame }