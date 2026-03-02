import { CollectionHeader } from "./collection/CollectionHeader";
import TrackList from "./music/TrackList";
import { useCollectionContext } from "../contexts/CollectionContext";
import { MusicHeader } from "./music/MusicHeader";

type SidePanelProps = {
  lyricsVisible: boolean;
  showMusics: boolean;
  loading?: boolean;
};

export function SidePanel({
  lyricsVisible,
  showMusics,
  loading,
}: SidePanelProps) {
  const { collection, collectionType } = useCollectionContext();
  if (!lyricsVisible && !showMusics) return null;

  const isMusicOrRecommendation =
    collectionType === "recommendation" ||
    collection?.type === "recommendation" ||
    collectionType === "music" ||
    collection?.type === "music";

  return (
    <>
      {isMusicOrRecommendation ? (
        <MusicHeader loading={loading} />
      ) : (
        <CollectionHeader />
      )}
      <div className="flex flex-1   flex-col gap-4 p-4 bg-neutral-950 overflow-y-auto  rounded-2xl border border-neutral-800">
        <TrackList />
      </div>
    </>
  );
}
