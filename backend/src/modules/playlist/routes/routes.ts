import { Router } from "express";
import { PlaylistController } from "../controllers/PlaylistController.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { validate } from "../../../middleware/validateSchema.js";
import {
  playlistBodyUpdateSchema,
  playlistSchema,
  playlistIdOnlyParamsSchema,
  playlistAndMusicParamsSchema,
  uploadImageSchema,
} from "../schema/schema.js";
import { optionalId } from "../../user/schemas/schema.js";
import { uploadImage } from "../../../libs/multer.js";

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
    uploadImage.single("image"),
    validate({ body: playlistSchema, file: uploadImageSchema }),

    playlistController.create,
  );

  router.post(
    "/playlist/:playlistId/music/:musicId",
    requireAuth,
    validate({ params: playlistAndMusicParamsSchema }),
    playlistController.addMusicToPlaylist,
  );

  router.delete(
    "/playlist/:playlistId/music/:musicId",
    requireAuth,
    validate({ params: playlistAndMusicParamsSchema }),
    playlistController.removeMusicFromPlaylist,
  );

  return router;
}
