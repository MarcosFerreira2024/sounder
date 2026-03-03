import "reflect-metadata";
import "./shared/container";
import { Server } from "./configs/server";
import dotenv from "dotenv";

dotenv.config();

const port = Number(process.env.PORT) || 3000;
const server = new Server(port);

const app = server.run();

export default app;
