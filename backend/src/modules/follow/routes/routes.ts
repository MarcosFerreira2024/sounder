import { Router } from "express";
import { FollowController } from "../controllers/FollowController";
import { validate } from "../../../middleware/validateSchema";
import { followSchema } from "../schemas/schema";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";


export function followRoutes(): Router {

    const router = Router();
    const followController = new FollowController();

    router.post("/:userId/follow", validate({ params: followSchema }), deserializeUser, requireAuth,  followController.follow);
    router.post("/:userId/unfollow", validate({ params: followSchema }), deserializeUser, requireAuth,  followController.unfollow);
    router.get("/:userId/followers", validate({ params: followSchema }),followController.getFollowers);
    router.get("/:userId/following", validate({ params: followSchema }),  followController.getFollowing);


    return router;
}

