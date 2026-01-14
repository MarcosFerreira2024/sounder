import React from "react";
import { MusicCover } from "../components/MusicCover";
import { AudioProvider } from "../contexts/AudioContext";

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
    <AudioProvider>
      <div className=" flex gap-2 ">
        <MusicCover
          isLyricsVisible={isLyricsVisible}
          toggleLyricsVisibilty={toggleLyricsVisibilty}
          showExtraControls={showExtraControls}
        />

        {children}
      </div>
    </AudioProvider>
  );
}

export default PlayerLayout;

