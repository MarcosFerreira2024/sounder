import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
  type RefObject,
} from "react";
import type { Music } from "./useAudio";

export interface ParsedLyricLine {
  timeInMs: number;
  text: string;
}

interface UseLyricsProps {
  lyrics: string;
  currentTime: number;
  seek: (time: number) => void;
  isPlaying: boolean;
  togglePlay: (e: React.MouseEvent<Element, MouseEvent>, song?: Music) => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export const useLyrics = ({
  lyrics = "",
  currentTime,
  seek,
  togglePlay,
  scrollContainerRef,
}: UseLyricsProps) => {
  const lineRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [rawLyrics, setRawLyrics] = useState("");
  const [parsedLyrics, setParsedLyrics] = useState<ParsedLyricLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!lyrics || !lyrics.startsWith("http")) {
      setRawLyrics("");
      setParsedLyrics([]);
      setIsLoading(false);
      return;
    }

    const fetchLyrics = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(lyrics);
        if (!res.ok) throw new Error("Failed to fetch lyrics");
        const text = await res.text();

        if (
          text.trim().startsWith("<!DOCTYPE") ||
          text.trim().startsWith("<html")
        ) {
          setRawLyrics("");
          setParsedLyrics([]);
        } else {
          setRawLyrics(text);
        }
      } catch (error) {
        console.error("Error fetching lyrics:", error);
        setRawLyrics("");
        setParsedLyrics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLyrics();
  }, [lyrics]);

  function parseLRC(lrcContent: string): ParsedLyricLine[] {
    if (!lrcContent) return [];

    const lines = lrcContent.split("\n");
    const result: ParsedLyricLine[] = [];

    const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/; // [mm:ss.xx]

    for (const line of lines) {
      const match = line.match(timeRegex);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const millis = match[3] ? parseInt(match[3].padEnd(3, "0")) : 0;
        const time = minutes * 60000 + seconds * 1000 + millis;

        let text = line.replace(timeRegex, "").trim();

        if (!text) text = "🎵";

        result.push({ timeInMs: time, text });
      }
    }

    return result;
  }

  const manualScrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!scrollContainerRef) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleManualScroll = () => {
      setIsManualScrolling(true);

      if (manualScrollTimeout.current)
        clearTimeout(manualScrollTimeout.current);
      manualScrollTimeout.current = window.setTimeout(() => {
        setIsManualScrolling(false);
      }, 3000);
    };

    container.addEventListener("wheel", handleManualScroll);

    return () => {
      container.removeEventListener("wheel", handleManualScroll);
      if (manualScrollTimeout.current)
        clearTimeout(manualScrollTimeout.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (rawLyrics) {
      setParsedLyrics(parseLRC(rawLyrics));
    } else {
      setParsedLyrics([]);
    }
  }, [rawLyrics]);

  const offset = useMemo(() => {
    if (!rawLyrics) return 0;

    const lines = rawLyrics.split("\n");

    for (const line of lines) {
      const match = line.match(/\[offset:([-\d]+)\]/i);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    return 0;
  }, [rawLyrics]);

  const handleLineClick = (
    line: ParsedLyricLine,
    index: number,
    e: React.MouseEvent,
  ) => {
    if (!line) return;

    togglePlay(e);

    let timeToSeek: number;
    const adjustedTime = line.timeInMs - Math.abs(offset);

    if (adjustedTime < 0) {
      timeToSeek = 0;
    } else if (line.timeInMs >= Math.abs(offset) + 30 * 1000) {
      timeToSeek = 30 * 1000;
    } else {
      timeToSeek = adjustedTime;
    }
    seek(timeToSeek / 1000);

    const lineEl = lineRefs.current[index];
    if (lineEl) {
      lineEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isLineActive = useCallback(
    (index: number) => {
      const line = parsedLyrics[index];
      const nextLine = parsedLyrics[index + 1];

      if (!line) return false;

      const currentMs = currentTime * 1000;
      const lineStart = line.timeInMs - Math.abs(offset);
      const lineEnd = nextLine
        ? nextLine.timeInMs - Math.abs(offset)
        : Infinity;

      const isActive = currentMs >= lineStart && currentMs < lineEnd;
      const elRef = lineRefs.current[index];

      if (elRef && isActive && !isManualScrolling) {
        elRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return isActive;
    },
    [currentTime, parsedLyrics, offset, isManualScrolling],
  );

  const handleResumeAutoScroll = () => {
    setIsManualScrolling(false);
  };

  return {
    parsedLyrics,
    scrollContainerRef,
    lineRefs,
    isManualScrolling,
    handleLineClick,
    isLineActive,
    handleResumeAutoScroll,
    offset,
    isLoading,
  };
};
