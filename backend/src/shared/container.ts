import { container } from "tsyringe";
import { IUserRepository } from "../modules/user/interfaces/IUserRepository";
import { UserRepository } from "../modules/user/repos/UserRepository";
import { IFollowRepository } from "../modules/follow/interfaces/IFollowRepository";
import { FollowRepository } from "../modules/follow/repos/FollowRepository";
import { IPlaylistRepository } from "../modules/playlist/interfaces/IPlaylistRepository";
import { PlaylistRepository } from "../modules/playlist/repos/PlaylistRepository";
import { IMusicRepository } from "../modules/music/interfaces/IMusicRepository";
import { MusicRepository } from "../modules/music/repos/MusicRepository";
import { IMusicActionRepository } from "../modules/music/interfaces/IMusicActionRepository";
import { MusicActionRepository } from "../modules/music/repos/MusicActionRepository";
import { IAlbumRepository } from "../modules/album/interfaces/IAlbumRepository";
import { AlbumRepository } from "../modules/album/repos/AlbumRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IFollowRepository>(
  "FollowRepository",
  FollowRepository
)


container.registerSingleton<IPlaylistRepository>(
  "PlaylistRepository",
  PlaylistRepository
);


container.registerSingleton<IMusicRepository>("MusicRepository", MusicRepository)

container.registerSingleton<IMusicActionRepository>("MusicActionRepository", MusicActionRepository)

container.registerSingleton<IAlbumRepository>("AlbumRepository", AlbumRepository)
