import { motion } from "framer-motion";
import { MusicHeader } from "./MusicHeader";
function PlaylistSection() {
  return (
    <motion.div
      key="playlist"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="h-full"
    >
      <MusicHeader />
    </motion.div>
  );
}

export default PlaylistSection;
