import { inject, injectable } from "tsyringe";
import { AppUser } from "../../../shared/types/user";
import { IFollowRepository } from "../interfaces/IFollowRepository";

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
