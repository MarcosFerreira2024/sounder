import { container, inject, injectable } from "tsyringe"
import { IGameSessionRepository } from "../interfaces/IGameSessionRepository"
import { AppUser } from "../../../shared/types/user"
import { GameState, GetGameState } from "./GetGameState"
import { normalizeString } from "../../../shared/helpers/normalizeString"
import { IGameUserRepository } from "../interfaces/IGameUserRepository"
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository"

@injectable()
class Answer {
  constructor(
    @inject("GameSessionRepository")
    private gameSessionRepository: IGameSessionRepository,

    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,

    @inject("GameUserRepository")
    private gameUserRepository: IGameUserRepository
  ) {}

  async execute(
    user: AppUser,
    gameId: string,
    gamemodeId: string,
    answer: string
  ): Promise<GameState> {

    const session = await this.gameSessionRepository.findSession(gameId, user.id)
    if (!session) throw new Error("Session not started")

    if (session.status === "FINISHED") {
      return container.resolve(GetGameState).execute(user, gameId)
    }

    const dailyGame = await this.dailyGameRepository.getToday()
    if (!dailyGame) throw new Error("Game has no daily content")

    const maxTries = 5
    const nextTry = session.tries + 1

    const isCorrect =
      normalizeString(dailyGame.correctAnswer) ===
      normalizeString(answer)


    if (isCorrect || nextTry >= maxTries) {

      if (isCorrect) {
        await this.gameUserRepository.updateStats(user.id, gamemodeId, {
          increment: {
            wins: 1,
            matches: 1,
            streak: 1
          }
        })
      } else {
        await this.gameUserRepository.updateStats(user.id, gamemodeId, {
          increment: {
            loses: 1,
            matches: 1
          },
          set: {
            streak: 0
          }
        })
      }

      await this.gameSessionRepository.updateSession(session.id, {
        status: "FINISHED",
        tries: nextTry,
        correctAnswer: isCorrect
      })

    } else {
      // só incrementa tentativa
      await this.gameSessionRepository.updateSession(session.id, {
        tries: nextTry
      })
    }

    return container.resolve(GetGameState).execute(user, gameId)
  }
}

export { Answer }
