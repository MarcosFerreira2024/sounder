import { User } from "better-auth/types";
import { IMusicActionRepository } from "../interfaces/IMusicActionRepository.js";

class getInteractedMusicsByUser {
    constructor(private musicActionRepository: IMusicActionRepository) {}

    async execute(user:User): Promise<{musicId:string,reaction:string}[]> {
        const interactedMusics = await this.musicActionRepository.getInteractedMusicsByUser(user.id);
        return interactedMusics;
    }
}

export { getInteractedMusicsByUser };