import { User } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async changeProfilePicture(userId: string, image: string): Promise<User> {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image,
      },
    });
  }

  async findUser(
    query: { id?: string; email?: string; name?: string; image?: string },
    page?: number,
    limit?: number,
  ): Promise<User[]> {
    const user = await prisma.user.findMany({
      where: {
        ...(query.id && { id: query.id }),
        ...(query.email && { email: query.email }),
        ...(query.name && {
          name: {
            contains: query.name,
            mode: "insensitive",
          },
        }),
        ...(query.image && { image: query.image }),
        artist: null,
      },
      skip: page && limit && (page - 1) * limit,
      take: limit,
      orderBy: { followers: { _count: "desc" } },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{ name: string; image: string }>,
  ): Promise<User> {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
export { UserRepository };
