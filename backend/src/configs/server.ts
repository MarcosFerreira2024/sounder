import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../configs/auth";
import { setupScalar } from "../libs/scalarSetup";
import { userRoutes } from "../modules/user/routes/route";
import { playlistRoutes } from "../modules/playlist/routes/routes";
import { followRoutes } from "../modules/follow/routes/routes";
import { musicRoutes } from "../modules/music/routes/routes";
import { albumRoutes } from "../modules/album/routes/routes";
import { gameRoutes } from "../modules/game/routes/routes";
import { artistRoutes } from "../modules/artist/routes/routes";

import path from "path";
import { searchRoutes } from "../modules/search/routes/routes";
import { loadModel } from "../libs/nsfwJs";

class Server {
  public app: Application;

  constructor(public port?: number) {
    this.app = express();
    this.config();
    this.routes();
    setupScalar(this.app);
    if (!process.env.VERCEL) {
      this.run();
      // loadModel(); // precisei remover o loadmodel da vercel, ficou muito lerdo
    }
  }

  private config(): void {
    this.app.use(
      cors({
        origin: ["https://sounder-tawny.vercel.app"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      }),
    );

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      "/src/storage/upload/public",
      express.static(path.resolve("src/storage/upload/public")),
    );
  }

  private routes(): void {
    this.app.use("/api/auth", toNodeHandler(auth));
    this.app.use("/api/user", userRoutes());
    this.app.use("/api", playlistRoutes());
    this.app.use("/api", followRoutes());
    this.app.use("/api/music", musicRoutes());
    this.app.use("/api/albums", albumRoutes());
    this.app.use("/api/game", gameRoutes());
    this.app.use("/api/artists", artistRoutes());
    this.app.use("/api/search", searchRoutes());
  }

  private run(): void {
    const port = this.port || 3000;
    this.app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }
}

export { Server };
