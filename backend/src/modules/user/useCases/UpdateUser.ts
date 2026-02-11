import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "better-auth/types";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { AppUser } from "../../../shared/types/user";

@injectable()
class UpdateUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(
    user: AppUser,
    data: Partial<{ name: string; image: string; email: string }>,
    id?: string,
  ): Promise<Partial<User>> {
    const target = isAdmin(user) ? (id ?? user.id) : user.id;

    if (data.email) {
      const [emailAlreadyExists] =
        (await this.userRepository.findUser({
          email: data.email,
        })) ?? [];
      if (emailAlreadyExists) {
        if (emailAlreadyExists.id === target)
          throw new Error("You already have this email");
        if (emailAlreadyExists.id !== target)
          throw new Error("Email already exists");
      }
    }

    const found = await this.userRepository.findById(target!);
    if (!found) throw new Error("User not found");

    const updatedUser = await this.userRepository.update(target!, data);

    return updatedUser;
  }
}

export { UpdateUser };
