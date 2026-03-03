import { inject, injectable } from "tsyringe";
import { IMusicRepository } from "../interfaces/IMusicRepository.js";
import { canChangeMusic } from "../rules/canChangeMusic.js";
import { AppUser } from "../../../shared/types/user.js";

@injectable()
class DeleteMusic {
  constructor(
    @inject("MusicRepository") private musicRepository: IMusicRepository,
  ) {}

  async execute(user: AppUser, musicId: string): Promise<void> {
    const musicExists = await this.musicRepository.getMusicById(musicId);
    if (!musicExists) throw new Error("Music not found");
    if (!canChangeMusic(user, musicExists.artistId)) {
      throw new Error("You don't have permission to delete this music");
    }

    await this.musicRepository.deleteMusic(musicId);
  }
}

export { DeleteMusic };
