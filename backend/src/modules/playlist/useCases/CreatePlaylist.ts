import { IPlaylistRepository } from "../interfaces/IPlaylistRepository.js";
import { Playlist } from "../../../generated/prisma/client.js";
import { inject, injectable } from "tsyringe";
import { IFileStorage } from "../../file/IFileStorage.js";
import { AppUser } from "../../../shared/types/user.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";

type CreatePlaylistDTO = {
  user: AppUser;
  image: {
    buffer: Buffer;
    originalName: string;
    mimeType: string;
  } | null;
  name: string;
  userId?: string;
};

@injectable()
class CreatePlaylist {
  constructor(
    @inject("PlaylistRepository")
    private playlistRepository: IPlaylistRepository,
    @inject("FileStorage")
    private fileStorage: IFileStorage,
  ) {}

  async execute(data: CreatePlaylistDTO): Promise<Playlist> {
    const target =
      isAdmin(data.user) && data.userId ? data.userId : data.user.id;

    const playlist = await this.playlistRepository.getPlaylistByUserId(target);

    playlist.some((pl) => {
      if (pl.name === data.name) {
        throw new Error("Playlist with this name already exists");
      }
    });

    let image = null;

    if (data.image) {
      const { path } = await this.fileStorage.save({
        buffer: data.image.buffer,
        filename: data.image.originalName,
        folder: `${target}/playlists`,
      });
      image = path;
    }

    return await this.playlistRepository.createPlaylist(target, {
      name: data.name,
      image: image,
    });
  }
}

export { CreatePlaylist };
