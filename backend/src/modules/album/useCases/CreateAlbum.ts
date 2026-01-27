import { inject, injectable } from "tsyringe";
import { AppUser } from "../../../shared/types/user";
import { IAlbumRepository } from "../interfaces/IAlbumRepository";
import { MusicAlbum } from "../../../generated/prisma/client";
import { canCreateAlbum } from "../rules/canCreateAlbum";


@injectable()
class CreateAlbum {

    constructor(
        @inject("AlbumRepository")
        private albumRepository: IAlbumRepository
    ) {}


    async execute(user: AppUser, name: string, cover: string): Promise<MusicAlbum> {
        if (!canCreateAlbum(user)) {
            throw new Error("Only artists or admins can create albums");
        }

        const albumAlreadyExists = await this.albumRepository.getAlbumByNameAndAuthorId(name, user.id);

        if (albumAlreadyExists) throw new Error("Album with this name already exists for this author");
        

        const album = await this.albumRepository.createAlbum({
            authorId: user.id,
            cover,
            name
        });

        return album
    }


}

export { CreateAlbum };