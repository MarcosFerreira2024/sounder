import { Router } from "express";
import { FollowController } from "../controllers/FollowController.js";
import { validate } from "../../../middleware/validateSchema.js";
import { followSchema } from "../schemas/schema.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import verifyRateLimit from "../../../middleware/verifyRateLimit.js";

export function followRoutes(): Router {
  const router = Router();
  const followController = new FollowController();

  router.post(
    "/user/:userId/follow",
    validate({ params: followSchema }),
    deserializeUser,
    requireAuth,
    verifyRateLimit(),
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
