import { inject, injectable } from "tsyringe";
import { Game } from "../../../generated/prisma/client";
import { IGameRepository } from "../interfaces/IGameRepository";

@injectable()
class CreateGame {
  constructor(
    @inject("GameRepository") private gameRepository: IGameRepository,
  ) {}

  async execute(dailyGameId: string, gamemodeId: string): Promise<Game> {
    const game = await this.gameRepository.findByDailyId(dailyGameId);
    if (game) return game;

    return this.gameRepository.create(dailyGameId, gamemodeId);
  }
}

export { CreateGame };
