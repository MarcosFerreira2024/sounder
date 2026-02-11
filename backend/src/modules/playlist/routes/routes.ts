import { Router } from "express";
import { PlaylistController } from "../controllers/PlaylistController";
import { requireAuth } from "../../../middleware/requireAuth";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { validate } from "../../../middleware/validateSchema";
import {
  playlistBodyUpdateSchema,
  playlistSchema,
  playlistIdOnlyParamsSchema,
  playlistAndMusicParamsSchema,
  uploadImageSchema, // Added this import
} from "../schema/schema";
import { optionalId } from "../../user/schemas/schema";
import { upload } from "../../../libs/multer";

export function playlistRoutes(): Router {
  const router = Router();
  const playlistController = new PlaylistController();

  router.use(deserializeUser);

  router.get(
    "/playlists",
    requireAuth,
    validate({ params: optionalId.strict() }),
    playlistController.getUserPlaylists,
  );

  router.get(
    "/playlist/:playlistId/musics",
    requireAuth,
    validate({ params: playlistIdOnlyParamsSchema }),
    playlistController.getPlaylistMusics,
  );

  router.get(
    "/playlist/:playlistId",
    requireAuth,
    validate({ params: playlistIdOnlyParamsSchema }),
    playlistController.getById,
  );

  router.delete(
    "/playlist/:playlistId",
    requireAuth,
    validate({ params: playlistIdOnlyParamsSchema }),
    playlistController.delete,
  );

  router.put(
    "/playlist/:playlistId",
    requireAuth,
    validate({
      body: playlistBodyUpdateSchema,
      params: playlistIdOnlyParamsSchema,
    }),
    playlistController.update,
  );

  router.post(
    "/playlist",
    requireAuth,
    upload.single("image"),
    validate({ body: playlistSchema, file: uploadImageSchema }),

    playlistController.create,
  );

  router.post(
    "/playlist/:playlistId/:musicId",
    requireAuth,
    validate({ params: playlistAndMusicParamsSchema }),
    playlistController.addMusicToPlaylist,
  );

  router.delete(
    "/playlist/:playlistId/:musicId",
    requireAuth,
    validate({ params: playlistAndMusicParamsSchema }),
    playlistController.removeMusicFromPlaylist,
  );

  return router;
}
