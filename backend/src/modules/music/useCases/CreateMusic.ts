import { inject, injectable } from "tsyringe";
import { IMusicRepository } from "../interfaces/IMusicRepository";
import { AppUser } from "../../../shared/types/user";
import { canCreateMusic } from "../rules/canCreateMusic";
import { Music } from "../../../generated/prisma/client";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { IArtistRepository } from "../../artist/interfaces/IArtistRepository";
import { IFileStorage } from "../../file/IFileStorage";
import { normalizeString } from "../../../shared/helpers/normalizeString";
import { IAlbumRepository } from "../../album/interfaces/IAlbumRepository";

@injectable()
class CreateMusic {
  constructor(
    @inject("MusicRepository")
    private musicRepository: IMusicRepository,
    @inject("ArtistRepository")
    private artistRepository: IArtistRepository,
    @inject("FileStorage")
    private fileStorage: IFileStorage,
    @inject("AlbumRepository")
    private albumRepository: IAlbumRepository,
  ) {}

  async execute(
    user: AppUser,
    name: string,
    lyricsFile: { buffer: Buffer; originalName: string; mimeType: string },
    genres: string[],
    albumId: string,
    artistId?: string,
  ): Promise<Music> {
    if (!canCreateMusic(user))
      throw new Error("Only artists or admins can create music");
    const albumExists = await this.albumRepository.getAlbumById(albumId);
    if (!albumExists) throw new Error("Album not found");

    let actualArtistId: string;
    let artistName: string;

    if (isAdmin(user)) {
      if (!artistId) throw new Error("Artists id is required");

      const artist = await this.artistRepository.getArtistById(artistId);
      if (!artist) throw new Error("Artists not found");
      actualArtistId = artist.artistId;
      artistName = artist.name;
    } else {
      if (!user.artist) throw new Error("User is not an artist");
      actualArtistId = user.artist.id;
      artistName = user.name;
    }

    const audioValue = `${artistName} ${name}`;

    const doesThisMusicAlreadyExist = await this.musicRepository.getMusics({
      audio: audioValue,
    });

    if (doesThisMusicAlreadyExist.length > 0)
      throw new Error("Music already exists");

    const musicNameNormalized = normalizeString(name);

    const { path } = await this.fileStorage.save({
      buffer: lyricsFile.buffer,
      filename: lyricsFile.originalName,
      folder: `${actualArtistId}/musics/${musicNameNormalized}/lyrics`,
    });

    return await this.musicRepository.createMusic({
      artistId: actualArtistId,
      audio: audioValue,
      name,
      lyrics: path,
      genres,
      albumId,
    });
  }
}

export { CreateMusic };
