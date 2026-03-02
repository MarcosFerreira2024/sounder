import { Router } from "express";
import { AlbumController } from "../controller/AlbumController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { albumId, createAlbum } from "../schemas/schema";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler";
import { uploadImage } from "../../../libs/multer";

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
