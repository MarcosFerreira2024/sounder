import MainLayout from "../layouts/MainLayout";
import PlayerLayout from "../layouts/PlayerLayout";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { SidePanel } from "../components/SidePanel";

function Playlist() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleLyricsVisibilty = () => {
    setIsVisible(!isVisible);
    return;
  };

  return (
    <MainLayout>
      <div className="text-neutral-100 grid gap-4">
        <PlayerLayout
          toggleLyricsVisibilty={toggleLyricsVisibilty}
          isLyricsVisible={isVisible}
        >
          <SidePanel lyricsVisible={isVisible} showPlaylistMusic={true} />
        </PlayerLayout>
        <Sidebar />
      </div>
    </MainLayout>
  );
}

export default Playlist;
