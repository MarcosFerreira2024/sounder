import { motion } from "framer-motion";
import { PlayListHeader } from "./PlaylistHeader";
import { PlaylistProvider, usePlaylistContext } from "../../contexts/PlaylistContext";
import PlaylistMusicList from "./PlaylistMusicList";
import { useAudioContext } from "../../contexts/AudioContext";
import { useEffect } from "react";

const PlaylistContent = () => {
  const { musics } = usePlaylistContext();
  const { selectMusic, currentMusic } = useAudioContext();

  useEffect(() => {
    if (musics.length > 0 && !currentMusic) {
      selectMusic(musics[0]);
    }
  }, [musics, selectMusic, currentMusic]);

  return (
    <motion.div
      key="playlist"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="h-full flex gap-4 flex-col"
    >
      <PlayListHeader />
      <PlaylistMusicList />
    </motion.div>
  );
};

function PlaylistSection() {
  return (
    <PlaylistProvider>
      <PlaylistContent />
    </PlaylistProvider>
  );
}

export default PlaylistSection;

