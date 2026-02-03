import { Router } from "express";
import { AlbumController } from "../controller/AlbumController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { albumId, createAlbum } from "../schemas/schema";
import { upload } from "../../../libs/multer";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler";

export function albumRoutes(): Router {
    const router = Router();


    const albumController = new AlbumController();

    router.get("/", deserializeUser, requireAuth, albumController.get);

    router.post("/",
        deserializeUser,
        requireAuth,
        uploadWithErrorHandler(upload.single("cover")),
        validate({body:createAlbum}),
        albumController.create
    );

    router.get("/:id", validate({ params: albumId }), albumController.getById);

    router.delete("/:id",deserializeUser,requireAuth, validate({ params: albumId }), albumController.delete);

    router.patch("/:id",deserializeUser,requireAuth, validate({ params: albumId }), albumController.update);

    return router;
}
