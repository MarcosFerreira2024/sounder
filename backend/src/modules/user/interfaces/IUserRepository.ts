
import { User } from "../../../generated/prisma/client";
 interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User[]>;
  findAll(page: number, limit: number): Promise<User[]>;

  changeProfilePicture(userId: string, image: string): Promise<User>;


  update(id: string,data: Partial<{  name: string;  image: string; }>
  ): Promise<User>;

  delete(id: string): Promise<void>;
}


export { IUserRepository }