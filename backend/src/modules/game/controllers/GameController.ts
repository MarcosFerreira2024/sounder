import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetGameState } from '../useCases/GetGameState';
import { handleAppError } from '../../../shared/helpers/handleAppError';
import { GetUserGameStats } from '../useCases/GetUserGameStats';
import { Answer } from '../useCases/Answer';
import { DeleteDailyGame } from '../useCases/DeleteDailyGame';
import { GetTodayGames } from '../useCases/GetTodayGames';
import { StartSession } from '../useCases/StartGame';

export class GameController {

  async startSession(req: Request, res: Response): Promise<Response> {
    try {
      
      const gameSession = await container.resolve(StartSession).execute(req.user!)

      return res.status(200).json({data:gameSession,message:'Game started'});
      
    } catch (e) {
      return handleAppError(res,e)
    }
  }


  async getTodayGames(req: Request, res: Response): Promise<Response> { 

    try {

      const dailyGame = await container.resolve(GetTodayGames).execute()

      return res.status(200).json({data:dailyGame, message:"Today games fetched successfully"})
    }
    catch (e) {
      return handleAppError(res,e)
    }
  }

  async deleteDailyGame(req: Request, res: Response): Promise<Response> { // rota de testes nao vai para producao

    try {

      await container.resolve(DeleteDailyGame).execute(req.body.dailyGameId)

      return res.status(200).json({message:"Daily game deleted successfully"})
    }
    catch (e) {
      return handleAppError(res,e)
    }
  }



  async getGameState(req: Request, res: Response): Promise<Response> {
    try {
      const gameState = await container.resolve(GetGameState).execute(req.user!,req.query.gameId as string);
      return res.status(200).json({data:gameState, message:"Game state fetched successfully"});
    } catch (e) {
      return handleAppError(res,e)
    }
  }

  async answer(req: Request, res: Response): Promise<Response> {
    try {
      const answerResponse = await container.resolve(Answer).execute(req.user!,req.body.gameId,req.body.gamemodeId,req.body.answer);

      return res.status(200).json({data:answerResponse,message:"Answer sent successfully"});

      
    } catch (e) {
      return handleAppError(res,e)
    }
  }

  async getUserStats(req: Request, res: Response): Promise<Response> {
    try {
      const stats = await container.resolve(GetUserGameStats).execute(req.user!, req.query.gameMode as string);
      return res.status(200).json({data:stats, message:"User stats fetched successfully"});
    } catch (e) {
      return handleAppError(res,e)
    }
  }


  
}
