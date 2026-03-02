import { MusicHeader } from "../music/MusicHeader";
import { Lyrics } from "./Lyrics";
import { useRef } from "react";

function LyricsSection({ loading }: { loading?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <MusicHeader loading={loading} />
      <div
        ref={scrollRef}
        className={` flex flex-1 flex-col h-full relative gap-10 p-4 bg-neutral-950 overflow-y-auto  rounded-2xl border border-neutral-800 ${loading && "animate-pulse"}`}
      >
        <Lyrics scrollContainerRef={scrollRef} loading={loading} />
      </div>
    </>
  );
}

export default LyricsSection;
