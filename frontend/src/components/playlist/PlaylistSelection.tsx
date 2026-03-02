import type { Playlist } from "../../hooks/usePlaylist";
import Image from "../ui/Image";

interface PlaylistSelectionProps {
  playlist: Playlist;
  isSelected: boolean;
  onToggle: (playlistId: string) => void;
}

export function PlaylistSelection({
  playlist,
  isSelected,
  onToggle,
}: PlaylistSelectionProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={() => onToggle(playlist.id)}
        className={`
          ${isSelected ? "bg-neutral-700" : "bg-neutral-900"} 
          min-w-8 min-h-8 max-w-8 max-h-8 
          rounded-xl border border-neutral-800
          cursor-pointer
        `}
      />

      <div className="flex items-start gap-2">
        <Image
          className="w-[120px] h-[120px] rounded-2xl border-neutral-800 border"
          src={playlist.image}
        />

        <div className="flex flex-col gap-0">
          <p className="text-opacity">Playlist: {playlist.name}</p>

          <p className="text-opacity text-sm">
            Músicas: {playlist.musics?.length ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
