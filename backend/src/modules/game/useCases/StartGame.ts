import { inject, injectable } from "tsyringe"
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository"
import { IGameRepository } from "../interfaces/IGameRepository"
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository"
import { GameSession } from "../../../generated/prisma/client"
import { AppUser } from "../../../shared/types/user"

@injectable()
class StartSession {
  constructor(
    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,

    @inject("GameRepository")
    private gameRepository: IGameRepository,

    @inject("GameSessionRepository")
    private gameSessionRepository: IGameSessionRepository
  ) {}

  async execute(user: AppUser): Promise<GameSession> {
    const todayDailyGame = await this.dailyGameRepository.getToday()

    if (!todayDailyGame) {
      throw new Error("DailyGame not created yet")
    }

    const game = await this.gameRepository.findByDailyId(
      todayDailyGame.id
    )

    if (!game) {
      throw new Error("Daily Game exists but Game was not created")
    }

    const existingSession =
      await this.gameSessionRepository.findSession(
        game.id,
        user.id
      )

    if (existingSession) {
      throw new Error("Session already started")
    }

    return this.gameSessionRepository.createSession({
      gameId: game.id,
      userId: user.id
    })
  }
}


export { StartSession }