import "reflect-metadata";
import "./shared/container";
import { Server } from "./configs/server";
import "./modules/game/cronjobs/dailyGame";
import dotenv from "dotenv";
import { loadModel } from "./libs/nsfwJs";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new Server(port);

if (!process.env.VERCEL) {
  server.run();
} else {
  loadModel();
}

export default server.app;
