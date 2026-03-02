import { inject, injectable } from "tsyringe";
import { IDailyGameRepository } from "../interfaces/IDailyGameRepository";
import { IGameHistoryRepository } from "../interfaces/IGameHistoryRepository";
import { IMusicRepository } from "../../music/interfaces/IMusicRepository";
import { IAlbumRepository } from "../../album/interfaces/IAlbumRepository";
import { IImageProcessingService } from "../../../shared/services/IImageProcessingService";

@injectable()
class CreateDailyGame {
  constructor(
    @inject("AlbumRepository") private albumRepository: IAlbumRepository,
    @inject("DailyGameRepository")
    private dailyGameRepository: IDailyGameRepository,
    @inject("GameHistoryRepository")
    private gameHistoryRepository: IGameHistoryRepository,
    @inject("MusicRepository") private musicRepository: IMusicRepository,
    @inject("ImageProcessingService")
    private imageProcessingService: IImageProcessingService,
  ) {}

  async execute() {
    const alreadyCreated = await this.dailyGameRepository.getToday();

    if (alreadyCreated) return alreadyCreated;

    const alreadyCreatedHistory = await this.gameHistoryRepository.getHistory();

    const alreadyCreatedMusicsNames = alreadyCreatedHistory.map(
      (music) => music.musicName,
    );

    let randomMusic = await this.musicRepository.getRandomMusic(
      alreadyCreatedMusicsNames,
    );
    let tries = 2;

    while (randomMusic === null) {
      randomMusic = await this.musicRepository.getRandomMusic(
        alreadyCreatedMusicsNames,
      );
      tries++;

      if (tries >= 2) {
        const music = await this.musicRepository.getRandomMusic([]);
        if (!music) throw new Error("There is no music in the database");
        randomMusic = music;
      }
    }
    const album = await this.albumRepository.getAlbumById(
      randomMusic.albumId as string,
    );

    if (!album) throw new Error("Album not found");

    const blurPaths = await this.imageProcessingService.ensureBlurImages(
      album.cover,
      album.authorId,
    );

    const game = await this.dailyGameRepository.createDailyGame({
      audio: randomMusic.audio,
      blur100: blurPaths.blur100,
      blur25: blurPaths.blur25,
      blur50: blurPaths.blur50,
      blur75: blurPaths.blur75,
      correctAnswer: album.author.user.name,
      date: new Date(),
      musicName: randomMusic.name,
      originalImage: album.cover,
    });

    return game;
  }
}

export { CreateDailyGame };
