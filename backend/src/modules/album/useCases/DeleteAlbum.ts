import { injectable, inject } from "tsyringe";
import { IAlbumRepository } from "../interfaces/IAlbumRepository.js";
import { canChangeAlbum } from "../rules/canChangeAlbum.js";
import { AppUser } from "../../../shared/types/user.js";
import { IMusicRepository } from "../../music/interfaces/IMusicRepository.js";

@injectable()
class DeleteAlbum {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository,
    @inject("MusicRepository") private musicRepository: IMusicRepository
  ) {}

  async execute(user:AppUser,id: string): Promise<void> {






    const albumFound = await this.albumRepository.getAlbumById(id);

    if (!albumFound) throw new Error("Album not found");

    if(!canChangeAlbum(user, id)) throw new Error("You don't have permission to delete this album");


    const musics = await this.musicRepository.updateMany(id, { albumId: null });

    await this.albumRepository.delete(id);
  }
}

export { DeleteAlbum };
