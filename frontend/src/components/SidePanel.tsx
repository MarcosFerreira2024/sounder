import LyricsSection from "./LyricsSection";
import PlaylistSection from "./playlist/PlaylistSection";

type SidePanelProps = {
  lyricsVisible: boolean;
  showPlaylistMusic: boolean;
};

export function SidePanel({
  lyricsVisible,
  showPlaylistMusic,
}: SidePanelProps) {
  if (!lyricsVisible && !showPlaylistMusic) return null;

  return (
    <section
      style={{ height: "calc(100dvh - 84px - 100px)" }}
      className="
        relative
        w-full
        max-w-[40%]
        min-h-150
        bg-neutral-900
        rounded-2xl
        border border-neutral-800
        grid gap-2
        p-2
        overflow-hidden
      "
    >
      {lyricsVisible && <LyricsSection />}
      {!lyricsVisible && showPlaylistMusic && <PlaylistSection />}
    </section>
  );
}
