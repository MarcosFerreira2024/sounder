import { Router } from "express";
import { MusicController } from "../controllers/MusicController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { musicId, createMusicBody, updateMusicBody, createMusicAndAlbumBody } from "../schemas/schema";

export function musicRoutes(): Router {
    const router = Router();

    const musicController = new MusicController();

    router.use(deserializeUser);


    router.get("/:id", validate({ params: musicId }), musicController.getById);
    router.get("/", musicController.get);

    router.post("/", requireAuth, validate({ body: createMusicBody }), musicController.create);
    router.post("/with-album", requireAuth, validate({ body: createMusicAndAlbumBody }), musicController.createMusicAndAlbum);
    router.put("/:id", requireAuth, validate({ params: musicId, body: updateMusicBody }), musicController.update);
    router.delete("/:id", requireAuth, validate({ params: musicId }), musicController.delete);
    
    router.post("/:id/like", requireAuth, validate({ params: musicId }), musicController.like);
    router.post("/:id/deslike", requireAuth, validate({ params: musicId }), musicController.deslike);



    // MusicController routes



    return router;
}