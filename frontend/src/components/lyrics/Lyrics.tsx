import type { RefObject } from "react";
import { useAudioContext } from "../../contexts/AudioContext";
import { useLyrics } from "../../hooks/useLyrics";
import Button from "../ui/Button";
import { AudioWaveformIcon } from "lucide-react";
import React from "react";
import { LyricsSkeleton } from "./LyricsSkeleton";

export function Lyrics({
  loading,
  scrollContainerRef,
}: {
  loading?: boolean;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}) {
  const {
    selectedSong: currentSelectedMusic,
    seekTo,

    isPlaying,
    songState,
    togglePlay,
  } = useAudioContext();

  const {
    parsedLyrics,
    lineRefs,
    handleLineClick,
    isLineActive,
    isManualScrolling,
    handleResumeAutoScroll,
    isLoading: isLyricsLoading,
  } = useLyrics({
    currentTime: songState.currentTime,
    seek: seekTo,
    isPlaying,
    togglePlay,

    lyrics: currentSelectedMusic?.lyrics ?? "",
    scrollContainerRef,
  });

  const showSkeleton = loading || isLyricsLoading;

  if (showSkeleton) return <LyricsSkeleton />;

  return (
    <React.Fragment>
      {isManualScrolling && (
        <div className="fixed right-10   flex ">
          <Button
            roundedValue="sm"
            size="md"
            icon={<AudioWaveformIcon size={16} />}
            onClick={handleResumeAutoScroll}
          />
        </div>
      )}
      <div className="min-h-[400px] ">
        <div className="grid  gap-10 p-4  ">
          {parsedLyrics && parsedLyrics.length > 0 ? (
            parsedLyrics.map((line, index) => {
              const isActive = isLineActive(index);
              return (
                <h1
                  key={index}
                  ref={(el: HTMLHeadingElement | null) => {
                    lineRefs.current[index] = el;
                  }}
                  onClick={(e: React.MouseEvent) =>
                    handleLineClick(line, index, e)
                  }
                  className={`font-inter text-4xl w-fit cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? "text-neutral-100 scale-105 origin-left"
                      : "text-neutral-500 hover:text-neutral-100 hover:underline hover:decoration-2 hover:decoration-neutral-100 hover:underline-offset-4"
                  }`}
                >
                  {line.text}
                </h1>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-4 mt-20">
              <h2 className="text-2xl font-inter">Carregando...</h2>
              <p className="text-sm">Aguarde enquanto carregamos as letras.</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
