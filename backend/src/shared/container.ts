import { container } from "tsyringe";
import { IUserRepository } from "../modules/user/interfaces/IUserRepository.js";
import { UserRepository } from "../modules/user/repos/UserRepository.js";
import { IFollowRepository } from "../modules/follow/interfaces/IFollowRepository.js";
import { FollowRepository } from "../modules/follow/repos/FollowRepository.js";
import { IPlaylistRepository } from "../modules/playlist/interfaces/IPlaylistRepository.js";
import { PlaylistRepository } from "../modules/playlist/repos/PlaylistRepository.js";
import { IMusicRepository } from "../modules/music/interfaces/IMusicRepository.js";
import { MusicRepository } from "../modules/music/repos/MusicRepository.js";
import { IMusicActionRepository } from "../modules/music/interfaces/IMusicActionRepository.js";
import { MusicActionRepository } from "../modules/music/repos/MusicActionRepository.js";
import { IAlbumRepository } from "../modules/album/interfaces/IAlbumRepository.js";
import { AlbumRepository } from "../modules/album/repos/AlbumRepository.js";
import { IDailyGameRepository } from "../modules/game/interfaces/IDailyGameRepository.js";
import { IGameHistoryRepository } from "../modules/game/interfaces/IGameHistoryRepository.js";
import { IGameSessionRepository } from "../modules/game/interfaces/IGameSessionRepository.js";
import { IGameUserRepository } from "../modules/game/interfaces/IGameUserRepository.js";
import { DailyGameRepository } from "../modules/game/repos/DailyGameRepository.js";
import { GameHistoryRepository } from "../modules/game/repos/GameHistoryRepository.js";
import { GameSessionRepository } from "../modules/game/repos/GameSessionRepository.js";
import { GameUserRepository } from "../modules/game/repos/GameUserRepository.js";
import { ArtistRepository } from "../modules/artist/repositories/ArtistRepository.js";
import { IArtistRepository } from "../modules/artist/interfaces/IArtistRepository.js";
import { IFileStorage } from "../modules/file/IFileStorage.js";
import { SupabaseFileStorage } from "../modules/file/SupabaseFileStorage.js";
import { IGameRepository } from "../modules/game/interfaces/IGameRepository.js";
import { GameRepository } from "../modules/game/repos/GameRepository.js";
import { ImageProcessingService } from "./services/ImageProcessingService.js";
import { IImageProcessingService } from "./services/IImageProcessingService.js";
import { IGameModesRepository } from "../modules/game/interfaces/IGameModesRepository.js";
import { GameModesRepository } from "../modules/game/repos/GameModesRepository.js";
import { ISearchService } from "../modules/search/interfaces/ISearchService.js";
import { SearchService } from "../modules/search/services/SearchService.js";

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

container.registerSingleton<IFileStorage>("FileStorage", SupabaseFileStorage);

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
