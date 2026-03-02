import type { Playlist } from "../../hooks/usePlaylist";
import { PlaylistSelection } from "./PlaylistSelection";

interface PlaylistSelectionListProps {
  playlists: Playlist[];
  selectedPlaylistIds: string[];
  onTogglePlaylist: (playlistId: string) => void;
}

export function PlaylistSelectionList({
  playlists,
  selectedPlaylistIds,
  onTogglePlaylist,
}: PlaylistSelectionListProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[120px]">
      {playlists.map((playlist) => (
        <PlaylistSelection
          key={playlist.id}
          playlist={playlist}
          isSelected={selectedPlaylistIds.includes(playlist.id)}
          onToggle={onTogglePlaylist}
        />
      ))}
    </div>
  );
}
