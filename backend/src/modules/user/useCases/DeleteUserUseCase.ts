import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "better-auth/types";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(user:User,id: string): Promise<void> {



    if (user.id !== id) throw new Error("You can only delete your own account");

    const userFound = await this.userRepository.findById(id);

    if (!userFound) throw new Error("User not found");

    await this.userRepository.delete(id);
  }
}

export { DeleteUserUseCase };
