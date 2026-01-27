import { Router } from "express";
import { PlaylistController } from "../controllers/PlaylistController";
import { requireAuth } from "../../../middleware/requireAuth";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { validate } from "../../../middleware/validateSchema";
import { playlistBodyUpdateSchema, playlistFullParamsSchema, playlistSchema } from "../schema/schema";
import { userId } from "../../../shared/schema/schema";
import z from "zod";

export function playlistRoutes(): Router {
    const router = Router();
    const playlistController = new PlaylistController();


    router.use(deserializeUser);


    router.get("/:userId/playlists",validate({ params: z.object({ userId }) }),  playlistController.getPlaylistsByUserId);

    router.get("/:userId/playlist/:playlistId",validate({ params: playlistFullParamsSchema }) , playlistController.getPlaylistMusics);

    router.delete("/:userId/playlists/:playlistId",validate({ params: playlistFullParamsSchema }), requireAuth,  playlistController.delete);

    router.patch("/:userId/playlists/:playlistId",validate({ body: playlistBodyUpdateSchema, params: playlistFullParamsSchema }),
    requireAuth,  playlistController.update);

    router.post("/playlist",validate({ body: playlistSchema }),requireAuth,  playlistController.create);



    return router;
}