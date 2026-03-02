import type { Music } from "../../hooks/useAudio";
import type { Playlist } from "../../hooks/usePlaylist";
import Button from "../ui/Button";
import { ModalWrapper } from "../ui/ModalWrapper";
import AddTracksToPlaylistSkeleton from "./AddTracksToPlaylistSkeleton";
import { PlaylistSelectionList } from "./PlaylistsSelectionList";

interface AddTracksToPlaylistModalProps {
  playlists: Playlist[];
  selectedPlaylistIds: string[];
  onTogglePlaylist: (playlistId: string) => void;
  loadingPlaylists?: boolean;
  handleAddMusicToPlaylist: (musicId: string) => Promise<void>;
  selectedSong: Music | null;
  handleClose: (musicId: string) => void;
}

export function AddTracksToPlaylistModal({
  playlists,
  selectedPlaylistIds,
  onTogglePlaylist,
  loadingPlaylists,
  handleClose,
  selectedSong,
  handleAddMusicToPlaylist,
}: AddTracksToPlaylistModalProps) {
  if (
    loadingPlaylists ||
    playlists === undefined ||
    selectedPlaylistIds === undefined ||
    onTogglePlaylist === undefined
  )
    return <AddTracksToPlaylistSkeleton />;

  return (
    <ModalWrapper
      onClose={() => handleClose(selectedSong!.id!)}
      title="Adicionar à playlist"
      subtitle={`Selecionadas: ${selectedPlaylistIds.length}`}
    >
      <div className="flex flex-col w-full gap-4">
        <PlaylistSelectionList
          playlists={playlists}
          selectedPlaylistIds={selectedPlaylistIds}
          onTogglePlaylist={onTogglePlaylist}
        />

        <Button
          disabled={selectedPlaylistIds.length === 0}
          size="md"
          onClick={() => handleAddMusicToPlaylist(selectedSong!.id!)}
          roundedValue="md"
        >
          Adicionar
        </Button>
      </div>
    </ModalWrapper>
  );
}
