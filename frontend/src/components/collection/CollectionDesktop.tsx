import { MusicCover } from "../music/MusicCover";
import Container from "../ui/Container";
import type { CollectionContentProps } from "./CollectionContent";
import CollectionMediaContent from "./CollectionMedia";

function CollectionDesktop({
  toggleLyricsVisibilty,
  isLyricsVisible,
  showExtraControls,
  loading,
}: CollectionContentProps) {
  return (
    <div className="lg:flex hidden gap-4 max-h-[calc(100dvh - 184px)]">
      <Container loading={loading} className="lg:w-1/2 w-2/3 w-full">
        <MusicCover
          loading={loading}
          toggleLyricsVisibilty={toggleLyricsVisibilty}
          isLyricsVisible={isLyricsVisible}
          showExtraControls={showExtraControls}
        />
      </Container>
      <Container
        loading={loading}
        className="lg:min-w-[600px] lg:w-1/2 w-1/3 min-w-[280px] flex flex-col"
      >
        <CollectionMediaContent
          loading={loading}
          isLyricsVisible={isLyricsVisible}
        />
      </Container>
    </div>
  );
}

export default CollectionDesktop;
