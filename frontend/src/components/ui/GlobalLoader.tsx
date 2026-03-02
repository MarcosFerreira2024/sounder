"use client";

import { motion } from "framer-motion";

export function GlobalLoader() {
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 0], scale: [1, 1.2, 1] },
    transition: {
      duration: 0.7,
      repeat: Infinity,
      delay,
    },
  });

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-neutral-900">
      <div className="flex items-end gap-2">
        <motion.span
          {...fade(0)}
          className="rounded-full bg-neutral-50 w-2.5 h-2.5"
        />

        <motion.span
          {...fade(0.2)}
          className="rounded-full bg-neutral-50 w-3.5 h-3.5"
        />

        <motion.span
          {...fade(0.4)}
          className="rounded-full bg-neutral-50 w-4 h-4"
        />
      </div>
    </div>
  );
}
