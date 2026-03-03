import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler";
import { optionalId, userUpdateBody } from "../schemas/schema";
import verifyRateLimit from "../../../middleware/verifyRateLimit";
import { uploadImage } from "../../../libs/multer";

export function userRoutes(): Router {
  const router = Router();

  const userController = new UserController();

  router.get(
    "/",

    deserializeUser,
    requireAuth,
    validate({ query: optionalId }),

    userController.getUser,
  );

  router.get(
    "/me",
    deserializeUser,
    requireAuth,
    (req: Request, res: Response) => {
      res.json(req.user);
    },
  );

  router.delete(
    "/:userId",
    deserializeUser,
    requireAuth,
    validate({ params: optionalId }),
    userController.delete,
  );

  router.put(
    "/",
    deserializeUser,
    requireAuth,
    validate({ params: optionalId, body: userUpdateBody }),
    userController.update,
  );

  router.post(
    "/profile-picture",
    deserializeUser,
    requireAuth,
    verifyRateLimit(1),
    uploadWithErrorHandler(uploadImage.single("image")),
    validate({ body: optionalId }),
    userController.changeProfilePicture,
  );

  return router;
}
