import { inject, injectable } from "tsyringe";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository";
import { IGameRepository } from "../interfaces/IGameRepository";
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository";
import { GameSession } from "../../../generated/prisma/client";
import { AppUser } from "../../../shared/types/user";
import { IGameModesRepository } from "../interfaces/IGameModesRepository";

@injectable()
class StartSession {
  constructor(
    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,

    @inject("GameRepository")
    private gameRepository: IGameRepository,

    @inject("GameSessionRepository")
    private gameSessionRepository: IGameSessionRepository,

    @inject("GameModesRepository")
    private gameModesRepository: IGameModesRepository,
  ) {}

  async execute(user: AppUser, mode: string): Promise<GameSession> {
    const gameModes = await this.gameModesRepository.getGameModes({
      name: mode,
    });
    const gameMode = gameModes[0];

    if (!gameMode) {
      throw new Error(`Game mode "${mode}" not found.`);
    }

    let gameId: string;
    if (gameMode.name === "Normal") {
      const todayDailyGame = await this.dailyGameRepository.getToday();

      if (!todayDailyGame) {
        throw new Error("DailyGame not created yet");
      }

      const game = await this.gameRepository.findByDailyId(todayDailyGame.id);

      if (!game) {
        throw new Error("Daily Game exists but Game was not created");
      }
      gameId = game.id;
    } else {
      throw new Error(`Logic not implemented for game mode "${mode}".`);
    }

    const existingSession = await this.gameSessionRepository.findSession(
      gameId,
      user.id,
    );

    if (existingSession) {
      return existingSession;
    }

    return this.gameSessionRepository.createSession({
      gameId: gameId,
      userId: user.id,
    });
  }
}

export { StartSession };
