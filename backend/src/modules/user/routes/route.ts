import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { validate } from "../../../middleware/validateSchema.js";
import { uploadWithErrorHandler } from "../../../middleware/uploadWithErrorHandler.js";
import { optionalId, userUpdateBody } from "../schemas/schema.js";
import verifyRateLimit from "../../../middleware/verifyRateLimit.js";
import { uploadImage } from "../../../libs/multer.js";

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
