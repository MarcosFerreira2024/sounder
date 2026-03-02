import "reflect-metadata";
import "../../../shared/container"; // Import the container setup
import cron from "node-cron";
import { GameService } from "../services/GameService";
import { container } from "tsyringe"; // Import container to resolve dependencies
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables

const gameService = container.resolve(GameService);
await gameService.normalMode();

cron.schedule("0 0 * * *", async () => {
  console.log("Criando o jogo do dia...");
  const gameService = container.resolve(GameService);
  await gameService.normalMode();
});
