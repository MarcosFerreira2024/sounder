import { useState, useEffect, useRef } from 'react';

interface ParsedLyricLine {
    timeInMs: number;
    text: string;
}

interface UseLyricsProps {
    lyrics: string[];
    currentTime: number;
    seek: (time: number) => void;
    isPlaying: boolean;
    play: () => void;

}

export const useLyrics = ({ lyrics, currentTime, seek, play}: UseLyricsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isManualScrolling, setIsManualScrolling] = useState(false);
    const lineRefs = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const handleManualScroll = () => {
            setIsManualScrolling(true);
        };
        container?.addEventListener('wheel', handleManualScroll);
        return () => {
            container?.removeEventListener('wheel', handleManualScroll);
        };
    }, []);

    const timeToMilliseconds = (timeString: string): number => {
        const [minutes, secondsAndMs] = timeString.split(":");
        const [seconds, ms] = secondsAndMs.split(".");
        return (
            parseInt(minutes) * 60 * 1000 +
            parseInt(seconds) * 1000 +
            parseInt(ms) * 10
        );
    };

    const parsedLyrics: ParsedLyricLine[] = lyrics
        .map((line) => {
            const match = line.match(/^\[(\d{2}:\d{2}\.\d{2})\]\s*(.*)$/);
            if (match) {
                const timeInMs = timeToMilliseconds(match[1]);
                const text = match[2].trim();
                return { timeInMs, text };
            }
            return null;
        })
        .filter((line): line is ParsedLyricLine => line !== null);

    const currentTimeInMs = currentTime * 1000;

    const activeIndex = parsedLyrics.findIndex((line, index) => {
        const nextLineTimeInMs =
            index < parsedLyrics.length - 1
                ? parsedLyrics[index + 1].timeInMs
                : Infinity;
        return (
            currentTimeInMs >= line.timeInMs &&
            currentTimeInMs < nextLineTimeInMs
        );
    });

    useEffect(() => {
        if (
            activeIndex !== -1 &&
            lineRefs.current[activeIndex] &&
            !isManualScrolling
        ) {
            lineRefs.current[activeIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [activeIndex, isManualScrolling]);

    const handleLineClick = (timeInMs: number) => {
        seek(timeInMs / 1000);
        play();
        setIsManualScrolling(false);
    };

    const handleResumeAutoScroll = () => {
        setIsManualScrolling(false);
    };

    return {
        parsedLyrics,
        activeIndex,
        scrollContainerRef,
        lineRefs,
        isManualScrolling,
        handleLineClick,
        handleResumeAutoScroll,
    };
};
