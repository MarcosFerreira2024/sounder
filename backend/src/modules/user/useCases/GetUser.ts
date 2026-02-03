import { injectable, inject } from "tsyringe";
import { User } from "../../../generated/prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { AppUser } from "../../../shared/types/user";

@injectable()
class GetUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(user: AppUser,userId:string): Promise<Partial<User>> {

    const target = isAdmin(user) && userId?userId:user.id



    const finded = await this.userRepository.findById(target);
    if (!finded) throw new Error("User not found");

    return {
      id: finded.id,
      name: finded.name,
      image: finded.image,
      email: finded.email,
      role: finded.role
    };
  }
}
export { GetUser };