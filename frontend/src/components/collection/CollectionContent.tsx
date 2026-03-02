import { useEffect } from "react";
import { useCollectionContext } from "../../contexts/CollectionContext";
import { useAudioContext } from "../../contexts/AudioContext";
import MainLayout from "../../layouts/MainLayout";
import CollectionMobile from "./CollectionMobile";
import CollectionDesktop from "./CollectionDesktop";
import NoRecommendations from "./NoRecommendations";

export type CollectionContentProps = {
  toggleLyricsVisibilty: () => void;
  isLyricsVisible: boolean;
  showExtraControls: boolean;
  loading?: boolean;
};

const NO_MORE_RECOMMENDATIONS_ERROR =
  "Você já interagiu com todas as músicas disponíveis. Este projeto é apenas uma demonstração e possui um conjunto limitado de dados, cheque também os jogos diários.";

function CollectionContent({
  toggleLyricsVisibilty,
  isLyricsVisible,
  showExtraControls,
}: CollectionContentProps) {
  const { collection, loading, error, collectionType } = useCollectionContext();
  const { setPlaylist } = useAudioContext();

  useEffect(() => {
    if (collection?.tracks) {
      setPlaylist(collection.tracks);
    }
  }, [collection?.tracks, setPlaylist]);

  const hasNoRecommendations =
    !loading &&
    collection?.tracks.length === 0 &&
    error?.message?.includes(NO_MORE_RECOMMENDATIONS_ERROR);

  if (hasNoRecommendations) {
    return (
      <MainLayout>
        <NoRecommendations />
      </MainLayout>
    );
  }

  const isAlbumEmpty =
    !loading && collectionType === "album" && collection?.tracks.length === 0;

  if (isAlbumEmpty) {
    return (
      <MainLayout>
        <div className="flex-1 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center p-8 text-center gap-6">
          <h1 className="text-3xl text-main ">Sem músicas :(</h1>
          <p className="text-opacity max-w-md mx-auto">
            Este álbum não possui nenhuma música cadastrada no momento.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CollectionMobile
        loading={loading}
        isLyricsVisible={isLyricsVisible}
        showExtraControls={showExtraControls}
        toggleLyricsVisibilty={toggleLyricsVisibilty}
      />
      <CollectionDesktop
        loading={loading}
        isLyricsVisible={isLyricsVisible}
        showExtraControls={showExtraControls}
        toggleLyricsVisibilty={toggleLyricsVisibilty}
      />
    </MainLayout>
  );
}

export default CollectionContent;
