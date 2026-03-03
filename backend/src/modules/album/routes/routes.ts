import { Router } from "express";
import { AlbumController } from "../controller/AlbumController.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { validate } from "../../../middleware/validateSchema.js";
import { albumId, createAlbum } from "../schemas/schema.js";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler.js";
import { uploadImage } from "../../../libs/multer.js";

export function albumRoutes(): Router {
  const router = Router();

  const albumController = new AlbumController();

  router.get("/", deserializeUser, requireAuth, albumController.get);

  router.post(
    "/",
    deserializeUser,
    requireAuth,
    uploadWithErrorHandler(uploadImage.single("cover")),
    validate({ body: createAlbum }),
    albumController.create,
  );

  router.get(
    "/:albumId/musics",
    validate({ params: albumId }),
    albumController.getMusics,
  );

  router.get(
    "/:albumId",
    validate({ params: albumId }),
    albumController.getById,
  );

  router.delete(
    "/:albumId",
    deserializeUser,
    requireAuth,
    validate({ params: albumId }),
    albumController.delete,
  );

  router.patch(
    "/:albumId",
    deserializeUser,
    requireAuth,
    validate({ params: albumId }),
    albumController.update,
  );

  return router;
}
