import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { upload } from "../../../libs/multer";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler";
import { optionalId, userUpdateBody } from "../schemas/schema";

export function userRoutes(): Router {
    const router = Router();

    const userController = new UserController();



    router.get("/:userId",deserializeUser,requireAuth, validate({ params: optionalId}),   userController.getUser);

    router.get("/", deserializeUser, requireAuth,(req: Request, res: Response) =>  {
        res.json(req.user);
    });


    router.delete("/:userId",deserializeUser,requireAuth, validate({ params: optionalId}),   userController.delete);

    router.put("/:userId",deserializeUser,requireAuth, validate({ params: optionalId, body: userUpdateBody}),   userController.update);

    router.post("/profilePicture",
        deserializeUser,
        requireAuth,
        uploadWithErrorHandler(upload.single("image")),
        validate({ body: optionalId}),
        userController.changeProfilePicture
    );

    return router;
}