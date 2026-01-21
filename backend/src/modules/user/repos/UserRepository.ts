import { User } from "../../../generated/prisma/client";
import { prisma } from "../../../libs/prismaClient";
import { IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
    
    async delete(id: string): Promise<void> {


        await prisma.user.delete({
            where: {
                id
            }
        })
        
    }
    async findAll(page: number, limit: number): Promise<User[]> {

        return await prisma.user.findMany({
            take: limit,
            skip: (page - 1) * limit
        })
        
    }
    async findByEmail(email: string): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                email
            }
        })
        
    }
    async findById(id: string): Promise<User | null> {

        return await prisma.user.findUnique({
            where: {
                id
            }
        })
        
    }
    async findByName(name: string): Promise<User[]> {

        return await prisma.user.findMany({
            where: {
                name
            }
        })
        
    }
    async update(id: string, data: Partial<{ name: string; image: string; }>): Promise<User> {

        return await prisma.user.update({
            where: {
                id
            },
            data
        })
        
    }
}
export { UserRepository }