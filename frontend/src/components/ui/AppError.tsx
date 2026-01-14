import { X } from "lucide-react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

type AppErrorProps = {
  message?: string;
  onClose?: () => void;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
};

function AppError({ message, onClose, setIsHovering }: AppErrorProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        initial={{ opacity: 0, translateY: 120 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 120 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute right-2 bottom-2 z-100"
      >
        <div className="bg-neutral-900 border-neutral-800 shadow-2xl max-w-[280px] border rounded-lg p-1 w-full relative">
          <Button
            size="xs"
            roundedValue="full"
            icon={<X size={12} />}
            onClick={onClose}
            className="absolute top-0.5 right-0.5  hover:text-white"
          />
          <div className="p-4 flex flex-col gap-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <div>
              <h2 className=" text-main ">{message}</h2>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AppError;
