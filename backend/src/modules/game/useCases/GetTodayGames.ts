import { inject, injectable } from "tsyringe";
import { IGameRepository } from "../interfaces/IGameRepository.js";
import { Game } from "../../../generated/prisma/client.js";

@injectable()
class GetTodayGames {
    constructor(@inject("GameRepository") private gameRepository: IGameRepository) {}

    execute(): Promise<Game[]> {
        return this.gameRepository.getToday()
    }
}

export { GetTodayGames }