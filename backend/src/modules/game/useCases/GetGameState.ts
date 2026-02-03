import { inject, injectable } from "tsyringe";
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository";
import { AppUser } from "../../../shared/types/user";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository";
import { resolveGameImage } from "../helper/resolveGameImage";
import { IGameRepository } from "../interfaces/IGameRepository";


export type GameState =
  | {
      status: "IN_PROGRESS"
      image: string
      audio: string
    }
  | {
      status: "FINISHED"
      image: string
      audio: string
      musicName: string
      artistName: string
      correctAnswer: boolean | null
    }

@injectable()
 class GetGameState {
  constructor(@inject("GameSessionRepository") private gameSessionRepository: IGameSessionRepository,@inject("GameRepository") private gameRepository:IGameRepository, @inject("DailyGameRepository") private dailyGameRepository: IDailyGameRepository) {}


  async execute(user:AppUser, gameId: string): Promise<GameState> {

    const gameIdExists = await this.gameRepository.getById(gameId)
    if(!gameIdExists) throw new Error("Invalid GameId")

    let userSession = await this.gameSessionRepository.findSession(gameId, user.id)
    if(!userSession) throw new Error("Session not created Yet")



    const todayGame = await this.dailyGameRepository.getToday()

    if(!todayGame) throw new Error("Today game not created yet")
    const tries = userSession!.tries

    if(userSession.status === "FINISHED") 
    {
      return {
        status: "FINISHED",
        image: resolveGameImage(todayGame, tries),
        audio: todayGame.audio,
        musicName: todayGame.musicName,
        artistName: todayGame.artistName,
        correctAnswer: userSession.correctAnswer,
      }
    }

    return {
      image: resolveGameImage(todayGame, tries),
      audio: todayGame.audio,
      status: userSession.status,
    }





 



  


  }

}


export { GetGameState }