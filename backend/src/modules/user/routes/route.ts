import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { userId } from "../../../shared/schema/schema";

export function userRoutes(): Router {
    const router = Router();

    const userController = new UserController();

    router.get("/", deserializeUser, requireAuth,(req: Request, res: Response) =>  {
        res.json(req.user);
    });

    router.get("/:userId", validate({ params: userId }),   userController.getUser);

    router.delete("/:userId",deserializeUser,requireAuth, validate({ params: userId }),   userController.delete);

    router.patch("/:userId",deserializeUser,requireAuth, validate({ params: userId }),   userController.update);

    return router;
}