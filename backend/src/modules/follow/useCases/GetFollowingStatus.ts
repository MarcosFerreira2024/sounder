import { inject, injectable } from "tsyringe";
import { IFollowRepository } from "../interfaces/IFollowRepository.js";
import { IUserRepository } from "../../user/interfaces/IUserRepository.js";
import { AppUser } from "../../../shared/types/user.js";

@injectable()
class GetFollowingStatus {
  constructor(
    @inject("FollowRepository")
    private followRepository: IFollowRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(user: AppUser, followingId: string) {
    const followingUserExists = await this.userRepository.findById(followingId);
    if (!followingUserExists) throw new Error("User not found");

    const isFollowing = await this.followRepository
      .getFollowing(user.id)
      .then((following) =>
        following.some((follow) => follow.id === followingId),
      );

    return isFollowing;
  }
}

export { GetFollowingStatus };
