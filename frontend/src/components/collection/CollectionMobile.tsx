import { MusicCover } from "../music/MusicCover";
import Container from "../ui/Container";
import type { CollectionContentProps } from "./CollectionContent";
import CollectionMediaContent from "./CollectionMedia";

function CollectionMobile({
  toggleLyricsVisibilty,
  isLyricsVisible,
  showExtraControls,
  loading,
}: CollectionContentProps) {
  return (
    <Container
      loading={loading}
      className={`"${isLyricsVisible ? "w-full " : ""} max-h-[calc(100dvh - 184px)] lg:hidden overflow-y-auto`}
    >
      <div className="flex flex-col gap-2">
        <CollectionMediaContent isLyricsVisible={isLyricsVisible} />

        <div className="p-4 bg-neutral-950 rounded-2xl border  border-neutral-800">
          <MusicCover
            loading={loading}
            toggleLyricsVisibilty={toggleLyricsVisibilty}
            isLyricsVisible={isLyricsVisible}
            showExtraControls={showExtraControls}
          />
        </div>
      </div>
    </Container>
  );
}
export default CollectionMobile;
