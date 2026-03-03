import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { User } from "../../../generated/prisma/client.js";
import { AppUser } from "../../../shared/types/user.js";
import { IFileStorage } from "../../file/IFileStorage.js";

type ChangeProfilePictureDTO = {
  user: AppUser;
  image: {
    buffer: Buffer;
    originalName: string;
    mimeType: string;
  };
  userId?: string;
};

@injectable()
class ChangeProfilePicture {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("FileStorage")
    private fileStorage: IFileStorage,
  ) {}

  async execute({
    user,
    image,
    userId,
  }: ChangeProfilePictureDTO): Promise<User> {
    let targetUserId: string;

    if (userId) {
      if (!isAdmin(user))
        throw new Error(
          "You don't have permission to change another user's profile picture",
        );
      const userExists = await this.userRepository.findById(userId);
      if (!userExists) throw new Error("User not found");

      targetUserId = userId;
    } else {
      targetUserId = user.id;
    }

    const { path } = await this.fileStorage.save({
      buffer: image.buffer,
      filename: image.originalName,
      folder: `${targetUserId}/profile-pictures`,
    });

    return await this.userRepository.changeProfilePicture(targetUserId, path);
  }
}

export { ChangeProfilePicture };
