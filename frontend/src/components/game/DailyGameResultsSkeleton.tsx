import Container from "../ui/Container";
import { AnimatePresence, motion } from "framer-motion";

type DailyGameResultsSkeletonProps = {
  isVisible: boolean;
};

function DailyGameResultsSkeleton({
  isVisible,
}: DailyGameResultsSkeletonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed flex items-center justify-center z-100 gap-4 w-screen h-screen bg-black/70 backdrop-blur-md left-0 top-0"
        >
          <Container className="flex-1 md:flex hidden overflow-hidden max-w-[580px] max-h-[400px] lg:max-h-[580px] relative">
            <div className="rounded-2xl w-full h-full border border-neutral-800 bg-neutral-950 animate-pulse" />

            <div className="flex items-center absolute left-0 bottom-2 min-w-full p-4">
              <div className="h-[70px] w-full rounded-xl bg-neutral-800 animate-pulse" />
            </div>
          </Container>

          <Container className="flex-1 max-w-[580px] max-h-[400px] lg:max-h-[580px] relative">
            <div className="absolute right-1 top-1 z-120 h-8 w-8 rounded-full bg-neutral-800 animate-pulse" />

            <div className="flex flex-col justify-between p-4 gap-4 bg-neutral-950 flex-1 rounded-2xl border border-neutral-800">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-center items-center">
                  <div className="h-10 w-50 bg-neutral-800 rounded-md animate-pulse" />
                </div>

                <div className="h-[88px] w-full rounded-xl bg-neutral-800 animate-pulse" />
                <div className="flex items-center min-w-full ">
                  <div className="h-[70px] w-full rounded-xl bg-neutral-800 animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <div className="h-10 w-40 rounded-full bg-neutral-800 animate-pulse" />
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DailyGameResultsSkeleton;
