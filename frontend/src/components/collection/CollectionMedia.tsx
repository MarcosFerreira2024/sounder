import LyricsSection from "../lyrics/LyricsSection";
import { SidePanel } from "../SidePanel";
import { useCollectionContext } from "../../contexts/CollectionContext";

function CollectionMediaContent({
  isLyricsVisible,
  loading,
}: {
  loading?: boolean;
  isLyricsVisible: boolean;
}) {
  const { collection, collectionType } = useCollectionContext();
  const isRecommendation =
    collectionType === "recommendation" || collection?.type === "recommendation";

  return (
    <div
      className={`flex flex-col gap-4 overflow-y-auto max-h-[400px] lg:max-h-full
      }`}
    >
      {isRecommendation || isLyricsVisible ? (
        <LyricsSection loading={loading} />
      ) : (
        <SidePanel
          loading={loading}
          lyricsVisible={isLyricsVisible}
          showMusics={true}
        />
      )}
    </div>
  );
}

export default CollectionMediaContent;
