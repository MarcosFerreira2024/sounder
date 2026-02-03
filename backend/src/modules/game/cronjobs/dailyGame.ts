import cron from "node-cron";
import { GameService } from "../services/GameService";


cron.schedule("0 0 * * *", async () => {
  console.log("Criando o jogo do dia...");
  await new GameService().normalMode();

});