import { inject, injectable } from "tsyringe";
import { IGameUserRepository } from "../interfaces/IGameUserRepository";
import { AppUser } from "../../../shared/types/user";
import { IGameModesRepository } from "../interfaces/IGameModesRepository";

@injectable()
class GetUserGameStats {
  constructor(
    @inject("GameUserRepository")
    private gameUserRepository: IGameUserRepository,
    @inject("GameModesRepository")
    private gameModesRepository: IGameModesRepository,
  ) {}

  async execute(user: AppUser, mode: string) {
    const gameMode = await this.gameModesRepository.getGameModes({
      name: mode,
    });
    const id = gameMode[0].id;

    if (!id) throw new Error("Game mode not found");

    const stats = await this.gameUserRepository.getUserStats(user.id, id);

    if (stats) return stats;

    return await this.gameUserRepository.createStats(user.id, id);
  }
}

export { GetUserGameStats };
