import { useLyrics } from "../hooks/useLyrics";
import { AnimatePresence } from "framer-motion";
import SyncButton from "./ui/SyncButton";
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
      <div className=" min-h-[620px]  bg-neutral-950 border-neutral-900  overflow-y-scroll   border rounded-2xl  grid">
        <div ref={scrollContainerRef} className="grid  gap-10 p-4  ">
          {parsedLyrics.length === 0 ? (
            <p className="text-opacity text-center w-full h-full text-lg">
              Essa música ainda não possui letra.
            </p>
          ) : (
            parsedLyrics.map((line, index) => {
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
            })
          )}
        </div>
      </div>
    </>
  );
}
