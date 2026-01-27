import { MusicReaction } from "../../../generated/prisma/enums";
import { prisma } from "../../../libs/prismaClient";
import { IMusicActionRepository } from "../interfaces/IMusicActionRepository";

class MusicActionRepository implements IMusicActionRepository {
    async upsert(musicAction: { musicId: string; userId: string; reaction: MusicReaction; }): Promise<void> {

        await prisma.musicAction.upsert({
            where: {
                musicId_userId: {
                    musicId: musicAction.musicId,
                    userId: musicAction.userId
                }
            },
            create: {
                musicId: musicAction.musicId,
                userId: musicAction.userId,
                reaction: musicAction.reaction
            },
            update: {
                reaction: musicAction.reaction
            }
        })
    }

 

   async getInteractedMusicsByUser(userId: string): Promise<{musicId:string,reaction:MusicReaction}[]> {
       const interactedMusics = await prisma.musicAction.findMany({
           where:{
               userId,
               
           },
           select: {
            musicId: true,
            reaction:true
           }
           
       })

       return interactedMusics;

   }





}


export { MusicActionRepository };