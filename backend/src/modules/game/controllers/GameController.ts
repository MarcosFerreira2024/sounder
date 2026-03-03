import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetGameState } from "../useCases/GetGameState.js";
import { handleAppError } from "../../../shared/helpers/handleAppError.js";
import { GetUserGameStats } from "../useCases/GetUserGameStats.js";
import { Answer } from "../useCases/Answer.js";
import { DeleteDailyGame } from "../useCases/DeleteDailyGame.js";
import { GetTodayGames } from "../useCases/GetTodayGames.js";
import { StartSession } from "../useCases/StartGame.js";

export class GameController {
  async startSession(req: Request, res: Response): Promise<Response> {
    try {
      const gameSession = await container
        .resolve(StartSession)
        .execute(req.user!, req.query.mode as string);

      return res
        .status(200)
        .json({ data: gameSession, message: "Game started" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async getTodayGames(req: Request, res: Response): Promise<Response> {
    try {
      const dailyGame = await container.resolve(GetTodayGames).execute();

      return res
        .status(200)
        .json({ data: dailyGame, message: "Today games fetched successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async deleteDailyGame(req: Request, res: Response): Promise<Response> {
    // rota de testes nao vai para producao

    try {
      await container.resolve(DeleteDailyGame).execute(req.body.dailyGameId);

      return res
        .status(200)
        .json({ message: "Daily game deleted successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async getGameState(req: Request, res: Response): Promise<Response> {
    try {
      const gameState = await container
        .resolve(GetGameState)
        .execute(req.user!, req.query.mode as string);
      return res
        .status(200)
        .json({ data: gameState, message: "Game state fetched successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async answer(req: Request, res: Response): Promise<Response> {
    try {
      const answerResponse = await container
        .resolve(Answer)
        .execute(req.user!, req.query.mode as string, req.body.answer);

      return res
        .status(200)
        .json({ data: answerResponse, message: "Answer sent successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async getUserStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await container
        .resolve(GetUserGameStats)
        .execute(req.user!, req.query.mode as string);
      return res
        .status(200)
        .json({ data: stats, message: "User stats fetched successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }
}
