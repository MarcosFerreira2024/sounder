import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "better-auth/types";

@injectable()
 class UpdateUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(
    user:User,
    id: string,
    data: Partial<{ name: string; image: string }>
  ): Promise<Partial<User>> {

    if(user.id !== id) throw new Error("You can only update your own account");

    const found = await this.userRepository.findById(id);
    if (!found) throw new Error("User not found");

    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }
}

export { UpdateUser };