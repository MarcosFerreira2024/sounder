import { inject, injectable } from "tsyringe";
import { IFollowRepository } from "../interfaces/IFollowRepository.js";
import { IUserRepository } from "../../user/interfaces/IUserRepository.js";
import { AppUser } from "../../../shared/types/user.js";


@injectable()
class Follow {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {}



    async execute(user:AppUser, followingId: string): Promise<void> {

        const followerId = user!.id


        if(followerId === followingId) throw new Error("You cannot follow yourself.");

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