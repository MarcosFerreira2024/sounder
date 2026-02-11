import { motion } from "framer-motion";
import { PlayListHeader } from "./PlaylistHeader";
import PlaylistMusicList from "./PlaylistMusicList";

const PlaylistSection = () => {
  return (
    <motion.div
      key="playlist"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      style={{}}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={` h-full flex gap-4 flex-col   `}
    >
      <PlayListHeader />
      <PlaylistMusicList />
    </motion.div>
  );
};

export default PlaylistSection;
