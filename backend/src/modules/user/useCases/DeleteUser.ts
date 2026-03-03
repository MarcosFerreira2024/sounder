import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { AppUser } from "../../../shared/types/user.js";

@injectable()
class DeleteUser{
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(user:AppUser,id: string): Promise<void> {



    if (!isAdmin(user) && user.id !== id) throw new Error("Unauthorized");


    const userFound = await this.userRepository.findById(id);

    if (!userFound) throw new Error("User not found");

    await this.userRepository.delete(id);
  }
}

export { DeleteUser};
