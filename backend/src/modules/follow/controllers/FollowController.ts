import { container } from "tsyringe";
import { Follow } from "../useCases/Follow";
import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { Unfollow } from "../useCases/Unfollow";
import { GetFollowingById } from "../useCases/GetFollowingById";
import { GetFollowersById } from "../useCases/GetFollowersById";
import { normalizePagination } from "../../../shared/helpers/normalizePagination";

class FollowController {

    async getFollowers(req: Request, res: Response) {
        try {
            const { userId:id } = req.params as { userId: string };

            const { limit, page } = normalizePagination(
                req.query.page as unknown as number,
                req.query.limit! as unknown as number,
                req.user!
            );


            const followers = await container.resolve(GetFollowersById).execute(id,page,limit);
            return res.status(200).json({data:followers, message:"Followers fetched successfully"});
        }
        catch (error: any) {
            return handleAppError(res, error);
        }

    }

    async getFollowing(req: Request, res: Response) {
        try {
            const { userId:id } = req.params as { userId: string };

            const { limit, page } = normalizePagination(
            req.query.page as unknown as number,
            req.query.limit! as unknown as number,
            req.user!
            );

            const following = await container.resolve(GetFollowingById).execute(id,page,limit);
            return res.status(200).json({data:following, message:"Following fetched successfully"});
        }
        catch (error: any) {
            return handleAppError(res, error);
        }

    }


    async unfollow (req: Request, res: Response) {

        try {
            const { userId:id } = req.params as {userId: string };


            await container.resolve(Unfollow).execute(req.user!, id);

            return res.status(200).json({ message: "Successfully unfollowed the user." });

        }
        catch (error: any) {
            return handleAppError(res, error);
        }



    }


    async follow (req: Request, res: Response) {

        try {
            const { userId:id } = req.params as {userId: string };




            await container.resolve(Follow).execute(req.user!, id);

            return res.status(200).json({ message: "Successfully followed the user." });

        }
        catch (error: any) {
            return handleAppError(res, error);
        }



    }


}

export { FollowController }