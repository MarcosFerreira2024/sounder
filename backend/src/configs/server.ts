import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../configs/auth.js";
import { setupScalar } from "../libs/scalarSetup.js";
import { userRoutes } from "../modules/user/routes/route.js";
import { playlistRoutes } from "../modules/playlist/routes/routes.js";
import { followRoutes } from "../modules/follow/routes/routes.js";
import { musicRoutes } from "../modules/music/routes/routes.js";
import { albumRoutes } from "../modules/album/routes/routes.js";
import { gameRoutes } from "../modules/game/routes/routes.js";
import { artistRoutes } from "../modules/artist/routes/routes.js";

import path from "path";
import { searchRoutes } from "../modules/search/routes/routes.js";
import { loadModel } from "../libs/nsfwJs.js";

class Server {
  public app: Application;

  constructor(public port?: number) {
    this.app = express();
    this.app.set("trust proxy", true);
    this.config();
    this.routes();
    setupScalar(this.app);
    if (!process.env.VERCEL) {
      this.run();
      // loadModel(); // precisei remover o loadmodel da vercel, ficou muito lerdo
    }
  }

  private config(): void {
    const trustedOrigins = process.env.TRUSTED_ORIGINS?.split(",") || [];

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || trustedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
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
