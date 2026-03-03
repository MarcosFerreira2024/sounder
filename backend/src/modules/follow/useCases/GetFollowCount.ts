import { inject, injectable } from "tsyringe";
import { AppUser } from "../../../shared/types/user.js";
import { IFollowRepository } from "../interfaces/IFollowRepository.js";

@injectable()
class GetFollowCount {
  constructor(
    @inject("FollowRepository") private followRepository: IFollowRepository,
  ) {}

  async execute(userId: string) {
    return await this.followRepository.getFollowCount(userId);
  }
}

export { GetFollowCount };
