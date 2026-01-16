import Elysia from "elysia";
import { Server } from "./configs/server";

new Server(Number(Bun.env.PORT), new Elysia()).run()
