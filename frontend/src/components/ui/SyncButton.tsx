import { AudioLines } from "lucide-react";
import { motion } from "framer-motion";

type SyncButtonProps = {
  isManualScrolling: boolean;
  alreadyPlayed: boolean;
  handleResumeAutoScroll: () => void;
};

function SyncButton({
  isManualScrolling,
  alreadyPlayed,
  handleResumeAutoScroll,
}: SyncButtonProps) {
  if (isManualScrolling && alreadyPlayed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute z-500  bottom-4 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={handleResumeAutoScroll}
          className="bg-neutral-100 text-neutral-950 flex justify-between items-center gap-2 font-inter px-4 py-2 rounded-full shadow-lg "
        >
          <AudioLines />
          Sincronizar
        </button>
      </motion.div>
    );
  }
}

export default SyncButton;
