import MainLayout from "../layouts/MainLayout";
import PlayerLayout from "../layouts/PlayerLayout";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";

function Playlist() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleLyricsVisibilty = () => {
    setIsVisible(!isVisible);
    return;
  };

  return (
    <MainLayout>
      <PlayerLayout
        toggleLyricsVisibilty={toggleLyricsVisibilty}
        isLyricsVisible={isVisible}
        showExtraControls={false}
      >
        <SidePanel lyricsVisible={isVisible} showPlaylistMusic={true} />
      </PlayerLayout>
    </MainLayout>
  );
}

export default Playlist;
