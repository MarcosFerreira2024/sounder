import { PlaylistMusicItem } from "../../modules/music/interfaces/IMusicRepository";
import { IMusicActionRepository } from "../../modules/music/interfaces/IMusicActionRepository";

async function addLikeStatusToMusics(
  musicActionRepository: IMusicActionRepository,
  userId: string,
  musics: PlaylistMusicItem[],
) {
  const interactedMusic =
    await musicActionRepository.getInteractedMusicsByUser(userId);

  const isMusicLiked = (music: PlaylistMusicItem) => {
    const isLiked = interactedMusic.find(
      (item) => item.musicId === music.id && item.reaction === "LIKE",
    );

    return !!isLiked;
  };

  const response = musics.map((music) => ({
    ...music,
    liked: isMusicLiked(music),
  }));

  return response;
}

export default addLikeStatusToMusics;
