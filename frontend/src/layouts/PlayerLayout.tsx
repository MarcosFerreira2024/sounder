import React from "react";
import { MusicCover } from "../components/MusicCover";
import { AudioProvider } from "../contexts/AudioContext";

function PlayerLayout({
  children,
  toggleLyricsVisibilty,
  isLyricsVisible,
}: {
  children: React.ReactNode;
  isLyricsVisible: boolean;
  toggleLyricsVisibilty: () => void;
}) {
  return (
    <AudioProvider src="Joji -  Glimpse of Us.mp3">
      <div className=" flex gap-2 ">
        <MusicCover
          isLyricsVisible={isLyricsVisible}
          toggleLyricsVisibilty={toggleLyricsVisibilty}
        />

        {children}
      </div>
    </AudioProvider>
  );
}

export default PlayerLayout;
