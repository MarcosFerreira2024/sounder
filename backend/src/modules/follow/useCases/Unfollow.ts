import { inject, injectable } from "tsyringe";
import { IFollowRepository } from "../interfaces/IFollowRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";

@injectable()
class Unfollow {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {








    }



    async execute(followerId: string, followingId: string): Promise<void> {

        const userFollowerExists = await this.userRepository.findById(followerId);
        const userFollowingExists = await this.userRepository.findById(followingId)

        if (!userFollowerExists || !userFollowingExists) {
            throw new Error("User not found");
        }

        await this.followRepository.getFollowing(followerId).then(async (following)  => {
            const isAlreadyFollowing = following.some(follow => follow.id=== followingId);
            if (isAlreadyFollowing) {
               return await this.followRepository.unfollowUser(followerId, followingId);
            }

            throw new Error("You are not following this user.");
        });





    }
}

export { Unfollow }