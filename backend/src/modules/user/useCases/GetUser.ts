import { injectable, inject } from "tsyringe";
import { User } from "../../../generated/prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { AppUser } from "../../../shared/types/user";

@injectable()
class GetUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(user: AppUser, userId?: string): Promise<Partial<User>> {
    const target = userId ?? user.id;

    const found = await this.userRepository.findById(target);
    if (!found) throw new Error("User not found");

    if (isAdmin(user)) {
      return {
        id: found.id,
        name: found.name,
        image: found.image,
        email: found.email,
        about: found.about,
        role: found.role,
        artistId: found.artistId,
        emailVerified: found.emailVerified,
      };
    } else {
      return {
        id: found.id,
        name: found.name,
        image: found.image,
        about: found.about,
      };
    }
  }
}
export { GetUser };
