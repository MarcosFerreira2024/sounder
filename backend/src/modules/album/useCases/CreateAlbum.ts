import { inject, injectable } from "tsyringe";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { IAlbumRepository } from "../interfaces/IAlbumRepository";
import { IArtistRepository } from "../../artist/interfaces/IArtistRepository";
import { AppUser } from "../../../shared/types/user";
import { Album } from "../../../generated/prisma/client";
import { canCreateAlbum } from "../rules/canCreateAlbum";
import { IFileStorage } from "../../file/IFileStorage";

type CreateAlbumDTO = {
  user: AppUser;
  name: string;
  artistId?: string;
  coverImage: {
    buffer: Buffer;
    originalName: string;
    mimeType: string;
  };
};

@injectable()
class CreateAlbum {
  constructor(
    @inject("AlbumRepository")
    private albumRepository: IAlbumRepository,

    @inject("ArtistRepository")
    private artistRepository: IArtistRepository,

    @inject("FileStorage")
    private fileStorage: IFileStorage,
  ) {}

  async execute({
    user,
    name,
    artistId,
    coverImage,
  }: CreateAlbumDTO): Promise<Album> {
    if (!canCreateAlbum(user)) {
      throw new Error("Only artists or admins can create albums");
    }

    if (!coverImage) {
      throw new Error("Cover image is required");
    }

    let targetArtistId: string;
    let artistName: string;

    if (artistId) {
      if (!isAdmin(user)) {
        throw new Error(
          "You don't have permissions to create an album for another artist",
        );
      }

      const artist = await this.artistRepository.getArtistById(artistId);
      if (!artist) throw new Error("Author not found");

      targetArtistId = artist.artistId;
      artistName = artist.name;
    } else {
      if (!user.artist) {
        throw new Error(
          "This user is not an artist or it's not assigned to an artist",
        );
      }

      targetArtistId = user.artist.id;
      artistName = user.name;
    }

    const albumAlreadyExists =
      await this.albumRepository.getAlbumByNameAndAuthorId(
        name,
        targetArtistId,
      );

    if (albumAlreadyExists)
      throw new Error("Album with this name already exists for this author");

    const cover = await this.fileStorage.save({
      buffer: coverImage.buffer,
      filename: coverImage.originalName,
      folder: `${artistId}/albums/${name}`,
    });

    const album = await this.albumRepository.createAlbum({
      authorId: targetArtistId,
      name,
      cover: cover.path,
    });

    return album;
  }
}

export { CreateAlbum };
