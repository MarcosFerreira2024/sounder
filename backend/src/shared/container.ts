import { container } from "tsyringe";
import { IUserRepository } from "../modules/user/interfaces/IUserRepository";
import { UserRepository } from "../modules/user/repos/UserRepository";
import { IFollowRepository } from "../modules/follow/interfaces/IFollowRepository";
import { FollowRepository } from "../modules/follow/repo/FollowRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IFollowRepository>(
  "FollowRepository",
  FollowRepository
)
