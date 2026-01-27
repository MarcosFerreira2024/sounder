import { container } from "tsyringe";
import { Follow } from "../useCases/Follow";
import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { Unfollow } from "../useCases/Unfollow";
import { GetFollowingById } from "../useCases/GetFollowingById";
import { GetFollowersById } from "../useCases/GetFollowersById";

class FollowController {

    async getFollowers(req: Request, res: Response) {
        try {
            const { userId:id } = req.params as { userId: string };

            const followers = await container.resolve(GetFollowersById).execute(id);
            return res.status(200).json({data:followers, message:"Followers fetched successfully"});
        }
        catch (error: any) {
            return handleAppError(res, error);
        }

    }

    async getFollowing(req: Request, res: Response) {
        try {
            const { userId:id } = req.params as { userId: string };

            const following = await container.resolve(GetFollowingById).execute(id);
            return res.status(200).json({data:following, message:"Following fetched successfully"});
        }
        catch (error: any) {
            return handleAppError(res, error);
        }

    }


    async unfollow (req: Request, res: Response) {

        try {
            const { userId:id } = req.params as {userId: string };

            const followerId = req.user!.id



            await container.resolve(Unfollow).execute(followerId, id);

            return res.status(200).json({ message: "Successfully unfollowed the user." });

        }
        catch (error: any) {
            return handleAppError(res, error);
        }



    }


    async follow (req: Request, res: Response) {

        try {
            const { userId:id } = req.params as {userId: string };

            const followerId = req.user!.id



            await container.resolve(Follow).execute(followerId, id);

            return res.status(200).json({ message: "Successfully followed the user." });

        }
        catch (error: any) {
            return handleAppError(res, error);
        }



    }


}

export { FollowController }