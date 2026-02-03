import { DailyGame } from "../../../generated/prisma/client"

function resolveGameImage(game: DailyGame, tries: number): string {
    if (tries === 0) return game.blur100
    if (tries === 1) return game.blur75
    if (tries === 3) return game.blur50
    if (tries === 4) return game.blur25
    return game.originalImage
}

export { resolveGameImage }