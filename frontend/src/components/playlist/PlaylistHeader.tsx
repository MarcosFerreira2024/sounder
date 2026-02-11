import { MoreVertical } from "lucide-react";
import { usePlaylistContext } from "../../contexts/PlaylistContext";
import { MediaInfoHeader } from "../MediaInfoHeader";
import PlaylistMoreOptionsMenu from "./PlaylistMoreOptionsMenu";
import PlaylistHeaderSkeleton from "./PlaylistHeaderSkeleton";
import { PlaylistOwnerModal } from "./PlaylistOwnerModal";
import { usePlaylistActions } from "../../hooks/usePlaylistActions";
import usePositionMenu from "../../hooks/usePositionMenu";

export function PlayListHeader() {
  const { loading, playlist } = usePlaylistContext();
  const { close, isVisible, position, toggle } = usePositionMenu();

  const {
    setDeleteOpen,
    isDeleteOpen,
    isRenameOpen,
    setRenameOpen,
    isVisibilityOpen,
    setVisibilityOpen,
  } = usePlaylistActions();

  if (loading || !playlist) {
    return (
      <>
        <PlaylistHeaderSkeleton isLoading={loading} data={playlist} />
      </>
    );
  }

  return (
    <>
      <MediaInfoHeader
        key={playlist.id}
        image={playlist.image}
        title={playlist.name}
        subtitle={
          playlist.musics?.length
            ? `${playlist.musics.length} músicas `
            : `Sem músicas`
        }
      >
        <div className="relative">
          <MoreVertical
            onClick={(e: React.MouseEvent) => toggle(e)}
            className="text-opacity cursor-pointer"
          />
          {isVisible && (
            <PlaylistMoreOptionsMenu
              playlistName={playlist.name}
              isPublic={playlist.visibility === "PUBLIC"}
              closeMenu={close}
              setDeleteOpen={setDeleteOpen}
              setRenameOpen={setRenameOpen}
              position={position}
              setVisibilityOpen={setVisibilityOpen}
            />
          )}
        </div>
      </MediaInfoHeader>

      <PlaylistOwnerModal
        playlistId={playlist.id}
        isDeleteOpen={isDeleteOpen}
        setDeleteOpen={setDeleteOpen}
        isRenameOpen={isRenameOpen}
        setRenameOpen={setRenameOpen}
        isVisibilityOpen={isVisibilityOpen}
        setVisibilityOpen={setVisibilityOpen}
        isPublic={playlist.visibility === "PUBLIC"}
        name={playlist.name}
      />
    </>
  );
}
