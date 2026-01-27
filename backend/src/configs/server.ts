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

class Server {
    public app: Application;

    constructor(public port: number) {
        this.app = express();
        this.config(); 

        this.app.use("/api/auth", toNodeHandler(auth));
        
        this.app.use("/api/users", userRoutes());
        this.app.use("/api/users", playlistRoutes());
        this.app.use("/api/users", followRoutes());
        this.app.use("/api/music",musicRoutes())
        setupScalar(this.app);
    }

    private config(): void {
        this.app.use(cors({
            origin: ["http://localhost:5173"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
            methods: ["GET", "POST", "PATCH", "DELETE"]
        }));
        this.app.use(cookieParser());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public run(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando em http://localhost:${this.port}`);
        });
    }
}

export { Server };
