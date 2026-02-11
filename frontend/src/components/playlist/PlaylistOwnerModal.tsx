import { DeletePlaylistModal } from "./DeletePlaylistModal";
import { RenamePlaylistModal } from "./RenamePlaylistModal";
import { ChangeVisibilityModal } from "../ChangeVisibilityModal";
import { updatePlaylist } from "../../actions/playlists/updatePlaylist";
import { deletePlaylist } from "../../actions/playlists/deletePlaylist";

function PlaylistOwnerModal({
  isDeleteOpen,
  setDeleteOpen,
  isRenameOpen,
  setRenameOpen,
  isVisibilityOpen,
  setVisibilityOpen,
  isPublic,
  name,
  playlistId,
}: {
  isDeleteOpen: boolean;
  setDeleteOpen: (isOpen: boolean) => void;
  isRenameOpen: boolean;
  setRenameOpen: (isOpen: boolean) => void;
  isVisibilityOpen: boolean;
  setVisibilityOpen: (isOpen: boolean) => void;
  isPublic: boolean;
  name: string;
  playlistId: string;
}) {
  return (
    <>
      {isDeleteOpen && (
        <DeletePlaylistModal
          onConfirm={() => {
            deletePlaylist(playlistId);
            setDeleteOpen(false);
          }}
          onCancel={() => setDeleteOpen(false)}
        />
      )}

      {isRenameOpen && (
        <RenamePlaylistModal
          initialValue={name}
          onConfirm={(name) => {
            updatePlaylist({ name }, playlistId);
            setRenameOpen(false);
          }}
          onCancel={() => setRenameOpen(false)}
        />
      )}

      {isVisibilityOpen && (
        <ChangeVisibilityModal
          isPublic={isPublic}
          onConfirm={() => {
            const visibility = isPublic ? "PRIVATE" : "PUBLIC";
            updatePlaylist({ visibility }, playlistId);
            setVisibilityOpen(false);
          }}
          onCancel={() => setVisibilityOpen(false)}
        />
      )}
    </>
  );
}

export { PlaylistOwnerModal };
