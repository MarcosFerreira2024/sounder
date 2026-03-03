import { container } from "tsyringe";
import { Follow } from "../useCases/Follow.js";
import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError.js";
import { Unfollow } from "../useCases/Unfollow.js";
import { GetFollowingById } from "../useCases/GetFollowingById.js";
import { GetFollowersById } from "../useCases/GetFollowersById.js";
import { normalizePagination } from "../../../shared/helpers/normalizePagination.js";
import { GetFollowingStatus } from "../useCases/GetFollowingStatus.js";
import { GetFollowCount } from "../useCases/GetFollowCount.js";

class FollowController {
  async getFollowCount(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };
      const count = await container.resolve(GetFollowCount).execute(id);
      return res.status(200).json({ data: count });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };

      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!,
      );

      const followers = await container
        .resolve(GetFollowersById)
        .execute(id, page, limit);
      return res
        .status(200)
        .json({ data: followers, message: "Followers fetched successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getFollowingStatus(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };

      const isFollowing = await container
        .resolve(GetFollowingStatus)
        .execute(req.user!, id);

      return res.status(200).json({ data: isFollowing });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };

      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!,
      );

      const following = await container
        .resolve(GetFollowingById)
        .execute(id, page, limit);
      return res
        .status(200)
        .json({ data: following, message: "Following fetched successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async unfollow(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };

      await container.resolve(Unfollow).execute(req.user!, id);

      return res
        .status(200)
        .json({ message: "Successfully unfollowed the user." });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async follow(req: Request, res: Response) {
    try {
      const { userId: id } = req.params as { userId: string };

      await container.resolve(Follow).execute(req.user!, id);

      return res
        .status(200)
        .json({ message: "Successfully followed the user." });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }
}

export { FollowController };
