import { Router } from "express";
import { MusicController } from "../controllers/MusicController.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { validate } from "../../../middleware/validateSchema.js";
import { musicId, createMusicBody, updateMusicBody } from "../schemas/schema.js";
import { z } from "zod";
import { zodErrorMessages } from "../../../shared/constants/errors.js";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler.js";
import { uploadLrc } from "../../../libs/multer.js";

export function musicRoutes(): Router {
  const router = Router();

  const musicController = new MusicController();

  router.use(deserializeUser);
  router.get("/recommendations", musicController.getRecommended);
  router.get("/:id", validate({ params: musicId }), musicController.getById);

  router.get("/", musicController.get);

  router.post(
    "/",
    requireAuth,
    uploadWithErrorHandler(uploadLrc.single("lyricsFile")),
    validate({ body: createMusicBody }),
    musicController.create,
  );

  router.put(
    "/album",
    requireAuth,
    validate({
      body: z
        .object({
          musicId: z.uuid(zodErrorMessages.invalid("Music ID")),
          albumId: z.uuid(zodErrorMessages.invalid("Album ID")),
          artistId: z.uuid(zodErrorMessages.invalid("ArtistId")).optional(),
        })
        .strict(),
    }),
    musicController.assignToAlbum,
  );

  router.put(
    "/:id",
    requireAuth,
    validate({ params: musicId, body: updateMusicBody }),
    musicController.update,
  );
  router.delete(
    "/:id",
    requireAuth,
    validate({ params: musicId }),
    musicController.delete,
  );

  router.post(
    "/:id/like",
    requireAuth,
    validate({ params: musicId }),
    musicController.like,
  );
  router.post(
    "/:id/deslike",
    requireAuth,
    validate({ params: musicId }),
    musicController.deslike,
  );

  return router;
}
