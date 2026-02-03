import { inject, injectable } from "tsyringe";
import { IFollowRepository } from "../interfaces/IFollowRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { AppUser } from "../../../shared/types/user";

@injectable()
class Unfollow {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {








    }



    async execute(user:AppUser, followingId: string): Promise<void> {

        const followerId = user.id
        if(followerId === followingId) throw new Error("You cannot unfollow yourself.");

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