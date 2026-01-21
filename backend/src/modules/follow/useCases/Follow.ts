import { inject, injectable } from "tsyringe";
import { IFollowRepository } from "../interfaces/IFollowRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";


@injectable()
class Follow {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {}



    async execute(followerId: string, followingId: string): Promise<void> {


        const userFollowerExists = await this.userRepository.findById(followerId);
        const userFollowingExists = await this.userRepository.findById(followingId)



        if (!userFollowerExists || !userFollowingExists) {
            throw new Error("User not found");
        }


        await this.followRepository.getFollowing(followerId).then((following) => {
            const isAlreadyFollowing = following.some(follow => follow.id=== followingId);
            if (isAlreadyFollowing) {
                throw new Error("You are already following this user.");
            }
        });


        await this.followRepository.followUser(followerId, followingId);



    }
}

export { Follow }