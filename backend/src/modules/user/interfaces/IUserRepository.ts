import { User } from "../../../generated/prisma/client.js";

type userQuery = {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
};

interface IUserRepository {
  findById(id: string): Promise<User | null>;

  findUser(query: userQuery, page?: number, limit?: number): Promise<User[]>;

  changeProfilePicture(userId: string, image: string): Promise<User>;

  update(
    id: string,
    data: Partial<{ name: string; image: string }>,
  ): Promise<User>;

  delete(id: string): Promise<void>;
}

export { IUserRepository };
