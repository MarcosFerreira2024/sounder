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
import { IDailyGameRepository } from "../modules/game/interfaces/IDailyGameRepository";
import { IGameHistoryRepository } from "../modules/game/interfaces/IGameHistoryRepository";
import { IGameSessionRepository } from "../modules/game/interfaces/IGameSessionRepository";
import { IGameUserRepository } from "../modules/game/interfaces/IGameUserRepository";
import { DailyGameRepository } from "../modules/game/repos/DailyGameRepository";
import { GameHistoryRepository } from "../modules/game/repos/GameHistoryRepository";
import { GameSessionRepository } from "../modules/game/repos/GameSessionRepository";
import { GameUserRepository } from "../modules/game/repos/GameUserRepository";
import { ArtistRepository } from "../modules/artist/repositories/ArtistRepository";
import { IArtistRepository } from "../modules/artist/interfaces/IArtistRepository";
import { IFileStorage } from "./storage/IFileStorage";
import { DiskFileStorage } from "./storage/DiskFileStorage";
import { IGameRepository } from "../modules/game/interfaces/IGameRepository";
import { GameRepository } from "../modules/game/repos/GameRepository";
import { ImageProcessingService } from "./services/ImageProcessingService";
import { IImageProcessingService } from "./services/IImageProcessingService";
import { IGameModesRepository } from "../modules/game/interfaces/IGameModesRepository";
import { GameModesRepository } from "../modules/game/repos/GameModesRepository";
import { ISearchService } from "../modules/search/interfaces/ISearchService";
import { SearchService } from "../modules/search/services/SearchService";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IFollowRepository>(
  "FollowRepository",
  FollowRepository,
);

container.registerSingleton<IPlaylistRepository>(
  "PlaylistRepository",
  PlaylistRepository,
);

container.registerSingleton<IMusicRepository>(
  "MusicRepository",
  MusicRepository,
);

container.registerSingleton<IMusicActionRepository>(
  "MusicActionRepository",
  MusicActionRepository,
);

container.registerSingleton<IAlbumRepository>(
  "AlbumRepository",
  AlbumRepository,
);

container.registerSingleton<IDailyGameRepository>(
  "DailyGameRepository",
  DailyGameRepository,
);

container.registerSingleton<IGameHistoryRepository>(
  "GameHistoryRepository",
  GameHistoryRepository,
);

container.registerSingleton<IGameSessionRepository>(
  "GameSessionRepository",
  GameSessionRepository,
);

container.registerSingleton<IGameUserRepository>(
  "GameUserRepository",
  GameUserRepository,
);

container.registerSingleton<IArtistRepository>(
  "ArtistRepository",
  ArtistRepository,
);

container.registerSingleton<IFileStorage>("FileStorage", DiskFileStorage);

container.registerSingleton<IGameRepository>("GameRepository", GameRepository);

container.registerSingleton<IGameModesRepository>(
  "GameModesRepository",
  GameModesRepository,
);

container.registerSingleton<ISearchService>("SearchService", SearchService);

container.registerSingleton<IImageProcessingService>(
  "ImageProcessingService",
  ImageProcessingService,
);
