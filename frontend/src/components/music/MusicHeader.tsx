import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { MediaInfoHeader } from "../MediaInfoHeader";
import { useAudioContext } from "../../contexts/AudioContext";
import { useCollectionContext } from "../../contexts/CollectionContext";
import { usePermissions } from "../../hooks/usePermissions";
import { authClient } from "../../libs/auth/auth";
import { useParams } from "react-router-dom";
import { AddTracksToPlaylistModal } from "../playlist/AddTracksToPlaylistModal";
import useMusicActions from "../../hooks/useMusicActions";

export function MusicHeader({ loading }: { loading?: boolean }) {
  const { selectedSong } = useAudioContext();
  const { collection, collectionType } = useCollectionContext();
  const { userId } = useParams();
  const authenticatedUserId = authClient.useSession().data?.user.id;
  const { isOwner } = usePermissions(authenticatedUserId);

  const {
    isVisible,
    open,
    handleCloseModal,
    handleAddMusicToPlaylist,
    handleSelection,
    playlists,
    selected,
    loadingPlaylists,
  } = useMusicActions();

  if (loading) {
    return (
      <MediaInfoHeader
        loading={true}
        showChangePictureModal={() => {}}
        subtitle=""
        image=""
        title=""
      />
    );
  }

  const music = selectedSong || collection?.tracks[0];

  const isRecommendation = collectionType === "recommendation";
  const showHeartButton = !isOwner(userId) && !isRecommendation;

  return (
    <>
      <MediaInfoHeader
        loading={loading}
        showChangePictureModal={() => {}}
        subtitle={music?.author ?? music?.audio.split(" ")[0] ?? ""}
        image={music?.cover ?? "/not-found.svg"}
        title={music?.name ?? music?.audio.split(" ")[0] ?? ""}
      >
        {showHeartButton && music?.id && (
          <Button
            onClick={open}
            title="Adicionar à Playlist"
            icon={<Heart />}
            roundedValue="full"
            size="md"
          />
        )}
      </MediaInfoHeader>

      {isVisible && music?.id && (
        <AddTracksToPlaylistModal
          loadingPlaylists={loadingPlaylists}
          handleClose={handleCloseModal}
          selectedSong={music}
          handleAddMusicToPlaylist={handleAddMusicToPlaylist}
          onTogglePlaylist={handleSelection}
          playlists={playlists}
          selectedPlaylistIds={selected}
        />
      )}
    </>
  );
}
