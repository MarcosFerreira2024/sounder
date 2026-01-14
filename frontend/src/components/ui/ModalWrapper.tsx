import { X } from "lucide-react";
import React from "react";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

type ModalWrapperProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  subtitle?: string;
};

export function ModalWrapper({
  title,
  subtitle,
  onClose,
  children,
}: ModalWrapperProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-100"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
          className="bg-neutral-900 border-neutral-800 shadow-2xl border rounded-lg p-2 w-full max-w-[460px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="xs"
            roundedValue="full"
            icon={<X size={16} />}
            onClick={onClose}
            className="absolute top-1 right-1  hover:text-white"
          />
          <div
            className={`p-4 flex flex-col ${
              title || (subtitle && "gap-4")
            } bg-neutral-950 border border-neutral-900 rounded-2xl`}
          >
            <div>
              <h2 className="text-2xl text-main ">{title}</h2>
              {subtitle && (
                <h2 className=" text-opacity text-sm">{subtitle}</h2>
              )}
            </div>

            <div>{children}</div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
