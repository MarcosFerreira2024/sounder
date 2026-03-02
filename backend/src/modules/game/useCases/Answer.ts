import { container, inject, injectable } from "tsyringe";
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository";
import { AppUser } from "../../../shared/types/user";
import { GameState, GetGameState } from "./GetGameState";
import { normalizeString } from "../../../shared/helpers/normalizeString";
import { IGameUserRepository } from "../interfaces/IGameUserRepository";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository";
import { IGameModesRepository } from "../interfaces/IGameModesRepository";
import { IGameRepository } from "../interfaces/IGameRepository";

@injectable()
class Answer {
  constructor(
    @inject("GameSessionRepository")
    private gameSessionRepository: IGameSessionRepository,

    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,

    @inject("GameUserRepository")
    private gameUserRepository: IGameUserRepository,

    @inject("GameModesRepository")
    private gameModesRepository: IGameModesRepository,

    @inject("GameRepository")
    private gameRepository: IGameRepository,
  ) {}

  async execute(
    user: AppUser,
    mode: string,
    answer: string,
  ): Promise<GameState> {
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
        throw new Error("No daily game created yet for 'normal' mode.");
      }
      const game = await this.gameRepository.findByDailyId(todayDailyGame.id);
      if (!game) {
        throw new Error("Game not found for the daily game.");
      }
      gameId = game.id;
    } else {
      throw new Error(`Logic not implemented for game mode "${mode}".`);
    }

    const session = await this.gameSessionRepository.findSession(
      gameId,
      user.id,
    );
    if (!session) throw new Error("Session not started");

    const dailyGame = await this.dailyGameRepository.getToday();
    if (!dailyGame) throw new Error("Game has no daily content");

    const maxTries = 5;
    const nextTry = session.tries + 1;

    const isCorrect =
      normalizeString(dailyGame.correctAnswer) === normalizeString(answer);

    if (isCorrect || nextTry >= maxTries) {
      const userStats = await this.gameUserRepository.getUserStats(
        user.id,
        gameMode.id,
      );

      const winPercent =
        ((userStats?.wins || 0) / (userStats?.matches || 1)) * 100;

      if (isCorrect) {
        await this.gameUserRepository.updateStats(user.id, gameMode.id, {
          increment: {
            wins: 1,
            matches: 1,
            streak: 1,
          },

          set: {
            winPercent: winPercent,
          },
        });
      } else {
        await this.gameUserRepository.updateStats(user.id, gameMode.id, {
          increment: {
            loses: 1,
            matches: 1,
          },

          set: {
            streak: 0,
            winPercent: winPercent,
          },
        });
      }

      await this.gameSessionRepository.updateSession(session.id, {
        status: "FINISHED",
        tries: nextTry,
        correctAnswer: isCorrect,
      });
    } else {
      await this.gameSessionRepository.updateSession(session.id, {
        tries: nextTry,
      });
    }

    return container.resolve(GetGameState).execute(user, mode);
  }
}

export { Answer };
