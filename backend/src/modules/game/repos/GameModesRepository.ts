import { GameMode } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import {
  gameModesQueryFilters,
  IGameModesRepository,
} from "../interfaces/IGameModesRepository";

class GameModesRepository implements IGameModesRepository {
  async create(name: string, description: string): Promise<GameMode> {
    return await prisma.gameMode.create({
      data: {
        name,
        description,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.gameMode.delete({ where: { id } });
  }

  async getGameModes(
    search?: gameModesQueryFilters,
    page?: number,
    limit?: number,
  ): Promise<GameMode[]> {
    return await prisma.gameMode.findMany({
      where: {
        ...(search?.name && {
          name: { contains: search.name, mode: "insensitive" },
        }),
        ...(search?.id && { id: search.id }),
        ...(search?.description && {
          description: { contains: search.description, mode: "insensitive" },
        }),
      },
      take: limit && limit,
      skip: page && limit && (page - 1) * limit,
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async update(
    id: string,
    data: { name?: string; description?: string },
  ): Promise<GameMode> {
    return await prisma.gameMode.update({
      where: {
        id,
      },
      data,
    });
  }
}

export { GameModesRepository };
