import { Router } from "express";
import { FollowController } from "../controllers/FollowController";
import { validate } from "../../../middleware/validateSchema";
import { followSchema } from "../schemas/schema";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { requireAuth } from "../../../middleware/requireAuth";

export function followRoutes(): Router {
  const router = Router();
  const followController = new FollowController();

  router.post(
    "/user/:userId/follow",
    validate({ params: followSchema }),
    deserializeUser,
    requireAuth,
    followController.follow,
  );
  router.post(
    "/user/:userId/unfollow",
    validate({ params: followSchema }),
    deserializeUser,
    requireAuth,
    followController.unfollow,
  );
  router.get(
    "/user/:userId/followers",
    validate({ params: followSchema }),
    followController.getFollowers,
  );
  router.get(
    "/user/:userId/following",
    validate({ params: followSchema }),
    followController.getFollowing,
  );

  router.get(
    "/user/:userId/is-following",
    validate({ params: followSchema }),
    deserializeUser,
    requireAuth,
    followController.getFollowingStatus,
  );

  router.get(
    "/user/:userId/follow-count",
    validate({ params: followSchema }),
    followController.getFollowCount,
  );

  return router;
}
