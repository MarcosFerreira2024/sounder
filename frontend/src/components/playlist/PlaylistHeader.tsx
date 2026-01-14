import { MoreVertical } from "lucide-react";
import { usePlaylistContext } from "../../contexts/PlaylistContext";
import { MediaInfoHeader } from "../MediaInfoHeader";
import useVisibility from "../../hooks/useVisibility";
import { useState } from "react";
import { DeletePlaylistModal } from "./DeletePlaylistModal";
import { RenamePlaylistModal } from "./RenamePlaylistModal";
import { ChangeVisibilityModal } from "../ChangeVisibilityModal";
import PlaylistMoreOptionsMenu from "./PlaylistMoreOptionsMenu";

export function PlayListHeader() {
  const { playlistName, playlistPhoto, playListMusicsTotal } =
    usePlaylistContext();

  const { isVisible, close, toggle } = useVisibility(false);
  const [isPublic, setIsPublic] = useState(false);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isVisibilityOpen, setVisibilityOpen] = useState(false);

  return (
    <>
      <MediaInfoHeader
        image={playlistPhoto}
        title={playlistName}
        subtitle={`${playListMusicsTotal} músicas`}
      >
        <div className="relative">
          <MoreVertical
            onClick={toggle}
            className="text-opacity cursor-pointer"
          />
          {isVisible && (
            <PlaylistMoreOptionsMenu
              playlistName={playlistName}
              isPublic={isPublic}
              closeMenu={close}
              setDeleteOpen={setDeleteOpen}
              setRenameOpen={setRenameOpen}
              setVisibilityOpen={setVisibilityOpen}
            />
          )}
        </div>
      </MediaInfoHeader>

      {isDeleteOpen && (
        <DeletePlaylistModal
          onConfirm={() => {
            console.log("Delete playlist");
            setDeleteOpen(false);
          }}
          onCancel={() => setDeleteOpen(false)}
        />
      )}

      {isRenameOpen && (
        <RenamePlaylistModal
          initialValue={playlistName}
          onConfirm={(name) => {
            console.log("Rename:", name);
            setRenameOpen(false);
          }}
          onCancel={() => setRenameOpen(false)}
        />
      )}

      {isVisibilityOpen && (
        <ChangeVisibilityModal
          isPublic={isPublic}
          onConfirm={() => {
            console.log("Visibility toggled");
            setVisibilityOpen(false);
          }}
          onCancel={() => setVisibilityOpen(false)}
        />
      )}
    </>
  );
}
