import { useLyrics } from "../hooks/useLyrics";
import { AnimatePresence } from "framer-motion";
import SyncButton from "./SyncButton";
import { useAudioContext } from "../contexts/AudioContext";

export function Lyrics() {
  const props = useAudioContext();
  const {
    parsedLyrics,
    activeIndex,
    scrollContainerRef,
    lineRefs,
    isManualScrolling,
    handleLineClick,
    handleResumeAutoScroll,
  } = useLyrics(props);

  return (
    <>
      <AnimatePresence>
        <SyncButton
          handleResumeAutoScroll={handleResumeAutoScroll}
          alreadyPlayed={props.alreadyPlayed}
          isManualScrolling={isManualScrolling}
        />
      </AnimatePresence>
      <div className="  bg-neutral-950 border-neutral-900  overflow-y-scroll min-h-full   border rounded-2xl  flex flex-col">
        <div ref={scrollContainerRef} className="grid gap-10 p-4 ">
          {parsedLyrics.map((line, index) => {
            const isActive = index === activeIndex;
            return (
              <h1
                key={index}
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                onClick={() => handleLineClick(line.timeInMs)}
                className={`font-inter text-4xl w-fit  ${
                  isActive
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-100 hover:underline hover:decoration-2  hover:decoration-neutral-100 hover:underline-offset-4"
                }`}
              >
                {line.text}
              </h1>
            );
          })}
        </div>
      </div>
    </>
  );
}
