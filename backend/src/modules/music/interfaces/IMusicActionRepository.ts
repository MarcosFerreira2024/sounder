import { MusicReaction } from "../../../generated/prisma/enums";

interface IMusicActionRepository {
    upsert(musicAction: { musicId: string; userId: string; reaction: MusicReaction }): Promise<void>


    getInteractedMusicsByUser(userId: string): Promise<{musicId:string,reaction:MusicReaction}[]>; 
}

export { IMusicActionRepository };