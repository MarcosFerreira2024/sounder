import { UserGameStatus } from "../../../generated/prisma/client.js"


type GameUserUpdateStats = {
  increment?: {
    wins?: number
    loses?: number
    matches?: number
    streak?: number
    timePlayed?: number
  }
  set?: {
    streak?: number
    winPercent?: number
  }
}



interface IGameUserRepository {
    getUserStats(userId:string,gameModeId: string): Promise<UserGameStatus | null>
    createStats(userId: string,gameModeId: string): Promise<UserGameStatus>
    updateStats(userId: string,gameModeId: string,data: GameUserUpdateStats): Promise<UserGameStatus>
}

export { IGameUserRepository, GameUserUpdateStats }