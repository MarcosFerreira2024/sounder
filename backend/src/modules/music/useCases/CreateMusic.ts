import { inject, injectable } from "tsyringe";
import { IMusicRepository } from "../interfaces/IMusicRepository";
import { AppUser } from "../../../shared/types/user";
import { canCreateMusic } from "../rules/canCreateMusic";
import { Music } from "../../../generated/prisma/client";


@injectable()
class CreateMusic {
    constructor(
        @inject("MusicRepository")
        private musicRepository: IMusicRepository
    ) {}

    async execute(user: AppUser, name: string, audio: string,lyrics: string,genres: string[],albumId: string): Promise<Music> {
        if (!canCreateMusic(user)) {
            throw new Error("Only artists or admins can create music");
        }

        return await this.musicRepository.createMusic({
            authorId: user.id,
            audio,
            name,
            lyrics,
            genres,
            albumId
        });
    }
}

export { CreateMusic };