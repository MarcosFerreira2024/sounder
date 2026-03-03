import { inject, injectable } from "tsyringe";
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository.js";
import { AppUser } from "../../../shared/types/user.js";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository.js";
import { resolveGameImage } from "../helper/resolveGameImage.js";
import { IGameRepository } from "../interfaces/IGameRepository.js";
import { IGameModesRepository } from "../interfaces/IGameModesRepository.js";
import { DailyGame } from "../../../generated/prisma/client.js";

export type GameState =
  | {
      status: "IN_PROGRESS";
      image: string;
      audio: string;
      tries: number;
    }
  | {
      status: "FINISHED";
      image: string;
      audio: string;
      musicName: string;
      artistName: string;
      correctAnswer: boolean | null | string;
      tries: number;
    };

@injectable()
class GetGameState {
  constructor(
    @inject("GameSessionRepository")
    private gameSessionRepository: IGameSessionRepository,
    @inject("GameRepository") private gameRepository: IGameRepository,
    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,
    @inject("GameModesRepository")
    private gameModesRepository: IGameModesRepository,
  ) {}

  async execute(user: AppUser, mode: string): Promise<GameState> {
    const gameModes = await this.gameModesRepository.getGameModes({
      name: mode,
    });
    const gameMode = gameModes[0];

    if (!gameMode) {
      throw new Error(`Game mode "${mode}" not found.`);
    }

    let gameId: string;
    let specificGame: DailyGame | null;

    if (gameMode.name === "Normal") {
      specificGame = await this.dailyGameRepository.getToday();
      if (!specificGame) {
        throw new Error("No daily game created yet for 'normal' mode.");
      }
      const game = await this.gameRepository.findByDailyId(specificGame.id);
      if (!game) {
        throw new Error("Game not found for the daily game.");
      }
      gameId = game.id;
    } else {
      throw new Error(`Logic not implemented for game mode "${mode}".`);
    }

    let userSession = await this.gameSessionRepository.findSession(
      gameId,
      user.id,
    );
    if (!userSession) throw new Error("Session not created Yet");

    const tries = userSession!.tries;

    if (userSession.status === "FINISHED") {
      return {
        status: "FINISHED",
        image: specificGame.originalImage,
        audio: specificGame.audio,
        musicName: specificGame.musicName,
        artistName: specificGame.artistName,
        correctAnswer: specificGame.correctAnswer,
        tries: tries,
      };
    }

    return {
      image: resolveGameImage(specificGame, tries),
      audio: specificGame.audio,
      status: userSession.status,
      tries: tries,
    };
  }
}

export { GetGameState };
