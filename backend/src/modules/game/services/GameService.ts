import { container, injectable } from "tsyringe";
import { CreateDailyGame } from "../useCases/CreateDailyGame.js";
import { CreateGamemode } from "../useCases/CreateGamemode.js";
import { CreateGame } from "../useCases/CreateGame.js";

@injectable()
class GameService {
  async normalMode() {
    const dailyGame = await container.resolve(CreateDailyGame).execute();
    const mode = await container
      .resolve(CreateGamemode)
      .execute(
        "Normal",
        "Good luck, you have 5 tries to guess the correct author of the song",
      );
    await container.resolve(CreateGame).execute(dailyGame.id, mode.id);

    console.log("Daily Normal mode game created successfully");
  }
}

export { GameService };
