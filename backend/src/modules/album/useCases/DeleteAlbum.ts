import { injectable, inject } from "tsyringe";
import { IAlbumRepository } from "../interfaces/IAlbumRepository";
import { canChangeAlbum } from "../rules/canChangeAlbum";
import { AppUser } from "../../../shared/types/user";

@injectable()
class DeleteAlbum {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository
  ) {}

  async execute(user:AppUser,id: string): Promise<void> {





    const albumFound = await this.albumRepository.getAlbumById(id);

    if (!albumFound) throw new Error("Album not found");

    canChangeAlbum(user, id);


    await this.albumRepository.delete(id);
  }
}

export { DeleteAlbum };
