import MainLayout from "../layouts/MainLayout";
import PlayerLayout from "../layouts/PlayerLayout";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";

function Home() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleLyricsVisibilty = () => {
    setIsVisible(!isVisible);
    return;
  };

  return (
    <MainLayout>
      <PlayerLayout
        toggleLyricsVisibilty={toggleLyricsVisibilty}
        isLyricsVisible={isVisible}
        showExtraControls={true}
      >
        <SidePanel lyricsVisible={isVisible} showPlaylistMusic={false} />
      </PlayerLayout>
    </MainLayout>
  );
}

export default Home;
