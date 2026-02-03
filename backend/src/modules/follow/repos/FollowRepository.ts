import z from "zod";
import { prisma } from "../../../libs/prismaClient";
import { FollowDTO, IFollowRepository } from "../interfaces/IFollowRepository";




class FollowRepository implements IFollowRepository {


    async followUser(followerId: string, followingId: string): Promise<void> {

        await prisma.userFollows.create({
            data: {
                followerId,
                followingId
            }
        });


    }

    async unfollowUser(followerId: string, followingId: string): Promise<void> {

        await prisma.userFollows.deleteMany({
            where: {
                followerId,
                followingId
            }
        });

    }


    async getFollowers(userId: string,page?:number, limit?:number): Promise<FollowDTO[]> {
    const followers = await prisma.userFollows.findMany({
        where: {
        followingId: userId
        },
        include: {
        follower: {
            select: { id: true, name: true, image: true },
        }


    },
        skip: page && limit && (page - 1) * limit,
        take: limit && limit,

            orderBy: {
                following:{
                    name: "asc"
                }
            }
        }


    );

    return followers.map(follow => ({
        id: follow.follower.id,
        name: follow.follower.name,
        image: follow.follower.image
    }));
    }


    async getFollowing(userId: string,page?:number, limit?:number): Promise<FollowDTO[]> {

        const following = await prisma.userFollows.findMany({
            where: { followerId: userId },
            include: {
            following: {
                select: { id: true, name: true, image: true },
            }
            
            },
            omit: {
                followerId: true,
                followingId: true,
                id: true
            }
            ,
            skip: page && limit && (page - 1) * limit,
            take: limit && limit,

            orderBy: {
                following:{
                    name: "asc"
                }
            }
        });



        const formattedFollowing = following.map(follow => ({
            id: follow.following.id,
            name: follow.following.name,
            image: follow.following.image
        }));

        return formattedFollowing;




    }




}

export { FollowRepository }