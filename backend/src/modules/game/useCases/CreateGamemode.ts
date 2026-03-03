import { inject, injectable } from "tsyringe";
import { IGameModesRepository } from "../interfaces/IGameModesRepository.js";
import { GameMode } from "../../../generated/prisma/client.js";


@injectable()
class CreateGamemode {

    constructor(
        @inject("GameModesRepository") private gameModeRepository: IGameModesRepository
    ) {}


    async execute(name:string, description:string): Promise<GameMode> {

       const exists = await this.gameModeRepository.getGameModes({name})
        if(exists.length > 0) return exists[0]


       const gameMode = await this.gameModeRepository.create(name,description)

       return gameMode
    }


}

export { CreateGamemode }