import "reflect-metadata";
import "./shared/container";
import { Server } from "./configs/server";
import dotenv from "dotenv";

dotenv.config();



new Server(Number(process.env.PORT)).run()
