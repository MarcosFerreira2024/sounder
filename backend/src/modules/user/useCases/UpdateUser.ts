import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "better-auth/types";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { AppUser } from "../../../shared/types/user";

@injectable()
 class UpdateUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(
    user:AppUser,
    data: Partial<{ name: string; image: string;email: string }>,
    id?: string,
  ): Promise<Partial<User>> {

    if(isAdmin(user) && !id) throw new Error("User id is required");

    const target = isAdmin(user)?id:user.id

    if(data.email){

      const emailAlreadyExists = await this.userRepository.findByEmail(data.email);
      if(emailAlreadyExists && emailAlreadyExists.id !== target) throw new Error("Email already exists");
      if(emailAlreadyExists && emailAlreadyExists.id === target) throw new Error("You already have this email");

    }


    const found = await this.userRepository.findById(target!);
    if (!found) throw new Error("User not found");

    const updatedUser = await this.userRepository.update(target!, data);

    return updatedUser;
  }
}

export { UpdateUser };