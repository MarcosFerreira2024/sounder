import { injectable, inject } from "tsyringe";
import { User } from "../../../generated/prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
class GetUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      name: user.name,
      image: user.image,
      email: user.email,
    };
  }
}
export { GetUser };