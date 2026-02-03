import { GameMode } from "../../../generated/prisma/client";

type gameModesQueryFilters = {
    name?: string;
    id?: string;
    description?: string



}

interface IGameModesRepository {
    getGameModes( search?: gameModesQueryFilters,page?: number, limit?: number,): Promise<GameMode[]>
    create(name: string,description: string): Promise<GameMode>
    delete(id: string): Promise<void>
    update(id: string, data: { name?: string; description?: string; }): Promise<GameMode>

}

export { IGameModesRepository, gameModesQueryFilters }