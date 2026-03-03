import { inject, injectable } from "tsyringe";
import { gameModesQueryFilters, IGameModesRepository } from "../interfaces/IGameModesRepository.js";
import { GameMode } from "../../../generated/prisma/client.js";


@injectable()
class GetGamemodes {
    constructor(@inject("GameModesRepository") private gameModeRepository: IGameModesRepository) {}


    async execute(): Promise<GameMode[]> {


        return await this.gameModeRepository.getGameModes()

    }
}


export { GetGamemodes }