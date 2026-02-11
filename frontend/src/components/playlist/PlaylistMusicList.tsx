import { useAudioContext } from "../../contexts/AudioContext";
import { usePlaylistContext } from "../../contexts/PlaylistContext";
import type { Music } from "../../hooks/useAudio";
import MusicPreviewButton from "../ui/MusicPreviewButton";
import PlaylistMusicSkeleton from "./PlaylistMusicSkeleton";

function PlaylistMusicList() {
  const { musics, loading } = usePlaylistContext();

  const { selectedSong } = useAudioContext();

  if (!musics || loading)
    return (
      <div className="flex flex-col p-3 bg-neutral-950 border border-neutral-800 rounded-2xl h-full gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <PlaylistMusicSkeleton index={index} key={index} />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col p-3 bg-neutral-950 border border-neutral-800 rounded-2xl h-full gap-4">
      {musics.map((music: Music) => {
        const active = music.id === selectedSong?.id;

        return (
          <MusicPreviewButton key={music.id} data={music} selected={active} />
        );
      })}
    </div>
  );
}

export default PlaylistMusicList;
