import React from "react";
import { MusicCover } from "../components/MusicCover";

function PlayerLayout({
  children,
  toggleLyricsVisibilty,
  isLyricsVisible,
  showExtraControls = true,
}: {
  children: React.ReactNode;
  isLyricsVisible: boolean;
  toggleLyricsVisibilty: () => void;
  showExtraControls?: boolean;
}) {
  return (
    <div className=" flex gap-2 ">
      <MusicCover
        isLyricsVisible={isLyricsVisible}
        toggleLyricsVisibilty={toggleLyricsVisibilty}
        showExtraControls={showExtraControls}
      />

      {children}
    </div>
  );
}

export default PlayerLayout;
