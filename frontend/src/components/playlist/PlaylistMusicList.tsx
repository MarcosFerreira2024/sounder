import MusicPreviewButton from "../ui/MusicPreviewButton";
import { usePlaylistContext } from "../../contexts/PlaylistContext";

function PlaylistMusicList() {
  const { musics } = usePlaylistContext();

  return (
    <div className="flex flex-col p-3 bg-neutral-950 border border-neutral-800 rounded-2xl h-full gap-4">
      {musics.map((song) => (
        <MusicPreviewButton key={song.id} song={song} />
      ))}
    </div>
  );
}

export default PlaylistMusicList;
