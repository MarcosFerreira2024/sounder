import { useState, useRef, useEffect, useCallback } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export type Music = {
  id: string;
  name: string;
  author: string;
  cover: string;
  lyrics: string;
  audio: string;
};

export const useAudio = () => {
  const LOCAL_STORAGE_KEY = "audio-volume";

  const [selectedSong, setSelectedSong] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getInitialVolume = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? parseFloat(saved) : 1;
  };

  const volumeInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setIsVolumeControlVisible(false),
      3000,
    );
  };

  const handleMouseEnterVolume = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsHovering(true);
    setIsVolumeControlVisible(true);
    console.log("mouse enter");
  };

  const handleMouseLeaveVolume = () => {
    setIsHovering(false);
    volumeInterval();
  };

  const [songState, setSongState] = useState<{
    currentTime: number;
    duration: number;
    volume: number;
  }>({
    currentTime: 0,
    duration: 0,
    volume: getInitialVolume(),
  });

  const [prevSongState, setPrevSongState] = useState(songState);

  const updateTime = () => {
    if (!audioRef.current) return;
    setSongState((prev) => ({
      ...prev,
      currentTime: audioRef.current!.currentTime,
      duration: audioRef.current!.duration || 0,
    }));
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = songState.volume;

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("loadedmetadata", updateTime);
    audioRef.current.addEventListener("play", () => setIsPlaying(true));
    audioRef.current.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateTime);
      audioRef.current?.removeEventListener("loadedmetadata", updateTime);
      audioRef.current?.removeEventListener("play", () => setIsPlaying(true));
      audioRef.current?.removeEventListener("pause", () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = songState.volume;
    }
  }, [songState.volume]);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, songState.volume.toString());
    }, 1200);

    return () => clearTimeout(handler);
  }, [songState.volume]);

  const fetchAudioFromItunes = async (songName: string) => {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        songName,
      )}&country=BR&entity=song&limit=1`,
    );
    const data = await response.json();
    const previewUrl = data.results[0]?.previewUrl;
    if (!previewUrl || !audioRef.current) return;

    if (audioRef.current.src !== previewUrl) {
      audioRef.current.src = previewUrl;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();

    setIsPlaying(true);
  };

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const resetAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setSongState({ currentTime: 0, duration: 0, volume: getInitialVolume() });
    setPrevSongState({
      currentTime: 0,
      duration: 0,
      volume: getInitialVolume(),
    });
    setIsPlaying(false);
  };

  const togglePlay = (e: React.MouseEvent, song?: Music) => {
    e.stopPropagation();
    if (!song || selectedSong === song) {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
      return;
    }

    const songToPlay = song || selectedSong;
    if (!songToPlay) return;

    setSelectedSong(songToPlay);
    fetchAudioFromItunes(songToPlay.name);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const seekForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      audioRef.current.duration,
    );
    setSongState((prev) => ({
      ...prev,
      currentTime: audioRef.current!.currentTime,
    }));
  };

  const seekBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0,
    );
    setSongState((prev) => ({
      ...prev,
      currentTime: audioRef.current!.currentTime,
    }));
  };

  const setVolume = (volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    setSongState((prev) => ({ ...prev, volume }));

    if (volume > 0) {
      setPrevSongState((prev) => ({ ...prev, volume }));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume > 0) {
      setPrevSongState((prev) => ({
        ...prev,
        volume: audioRef.current!.volume,
      }));
      setVolume(0);
    } else {
      setVolume(prevSongState.volume || 1);
    }
  };

  const getVolumeIcon = () => {
    if (songState.volume === 0) return <VolumeX />;
    if (songState.volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };

  return {
    isPlaying,
    setIsPlaying,
    selectedSong,
    setSelectedSong,
    togglePlay,
    playAudio,
    pauseAudio,
    resetAudio,
    formatTime,
    songState,
    seekForward,
    seekBackward,
    setVolume,
    toggleMute,
    getVolumeIcon,
    isVolumeControlVisible,
    setIsVolumeControlVisible,
    audioRef,
    handleMouseEnterVolume,
    handleMouseLeaveVolume,
  };
};
