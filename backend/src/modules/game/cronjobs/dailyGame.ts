import "reflect-metadata";
import "../../../shared/container";
import cron from "node-cron";
import { GameService } from "../services/GameService.js";
import { container } from "tsyringe";
import dotenv from "dotenv";

dotenv.config();

const gameService = container.resolve(GameService);
await gameService.normalMode();

cron.schedule("0 0 * * *", async () => {
  console.log("Criando o jogo do dia...");
  const gameService = container.resolve(GameService);
  await gameService.normalMode();
});
