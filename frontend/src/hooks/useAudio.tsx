import { useState, useRef, useEffect, useCallback } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

export type Music = {
  id?: string;
  name: string;
  author: string;
  cover: string;
  lyrics?: string;
  audio: string;
  liked?: boolean;
};

export const useAudio = () => {
  const LOCAL_STORAGE_KEY = "audio-volume";

  const [selectedSong, setSelectedSong] = useState<Music | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Music[]>([]);

  const [isHovering, setIsHovering] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayImmediately = useRef(false);

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
  const fetchAudioFromItunes = useCallback(
    async (songName: string) => {
      if (!audioRef.current) return;

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          songName,
        )}&country=BR&entity=song&limit=1`,
      );
      const data = await response.json();
      const previewUrl = data.results[0]?.previewUrl;

      if (!previewUrl) {
        console.warn(`No preview URL found for ${songName}`);
        return;
      }

      if (audioRef.current.src !== previewUrl) {
        audioRef.current.src = previewUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.load();
      }

      return previewUrl;
    },
    [audioRef],
  );

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
  }, [setIsPlaying]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, [setIsPlaying]);

  const resetAudio = useCallback(() => {
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
  }, []);

  const loadDirectAudio = useCallback(
    (audioUrl: string) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
        audio.currentTime = 0;
        audio.load();
      }
      const onCanPlay = () => {
        if (shouldPlayImmediately.current) {
          playAudio();
        }
        shouldPlayImmediately.current = false;
        audio.removeEventListener("canplaythrough", onCanPlay);
      };
      audio.addEventListener("canplaythrough", onCanPlay);
      return () => {
        audio.removeEventListener("canplaythrough", onCanPlay);
      };
    },
    [playAudio],
  );

  const setPlaylist = useCallback(
    (playlist: Music[]) => {
      setCurrentPlaylist(playlist);
      if (playlist.length > 0) {
        if (!selectedSong) {
          setSelectedSong(playlist[0]);
          setCurrentSongIndex(0);
        }
      }
    },
    [selectedSong],
  );

  const togglePlay = (e: React.MouseEvent, song?: Music) => {
    if (!song || (selectedSong && song.id === selectedSong.id)) {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
      return;
    }

    setSelectedSong(song);
    shouldPlayImmediately.current = true;
    const newIndex = currentPlaylist?.findIndex((m) => m.id === song.id) ?? -1;
    setCurrentSongIndex(newIndex);
    if (isPlaying) {
      pauseAudio();
      setIsPlaying(false);
    } else {
      playAudio();
      setIsPlaying(true);
    }
  };

  const nextSong = useCallback(() => {
    if (
      !currentPlaylist ||
      currentPlaylist.length === 0 ||
      currentSongIndex === -1
    )
      return;

    if (currentSongIndex === currentPlaylist.length - 1) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    const nextIndex = currentSongIndex + 1;
    setCurrentSongIndex(nextIndex);
    setSelectedSong(currentPlaylist[nextIndex]);
    shouldPlayImmediately.current = true;
  }, [currentSongIndex, currentPlaylist, setIsPlaying]);

  const previousSong = useCallback(() => {
    if (
      !currentPlaylist ||
      currentPlaylist.length === 0 ||
      currentSongIndex === -1
    )
      return;

    const prevIndex =
      (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    setCurrentSongIndex(prevIndex);
    setSelectedSong(currentPlaylist[prevIndex]);
    shouldPlayImmediately.current = true;
  }, [currentSongIndex, currentPlaylist]);

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
      audioRef.current.volume = songState.volume;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", nextSong);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", nextSong);
    };
  }, [updateTime, setIsPlaying, nextSong]);

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

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      const audio = audioRef.current;
      setIsPlaying(false);

      const isLikelyDirectUrl =
        selectedSong.audio && selectedSong.audio.startsWith("http");

      if (isLikelyDirectUrl) {
        loadDirectAudio(selectedSong.audio);
      } else if (selectedSong.name) {
        fetchAudioFromItunes(selectedSong.name)
          .then(() => {
            const onCanPlay = () => {
              if (shouldPlayImmediately.current) {
                playAudio();
              }
              shouldPlayImmediately.current = false;
              audio.removeEventListener("canplaythrough", onCanPlay);
            };
            audio.addEventListener("canplaythrough", onCanPlay);

            return () => {
              audio.removeEventListener("canplaythrough", onCanPlay);
            };
          })
          .catch((error) => {
            console.error("Error fetching or loading audio:", error);
          });
      } else {
        console.warn("No audio source or name available for selected song.");
      }
    } else {
      pauseAudio();
      resetAudio();
    }
  }, [
    selectedSong,
    fetchAudioFromItunes,
    loadDirectAudio,
    playAudio,
    pauseAudio,
    resetAudio,
  ]);

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

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setSongState((prev) => ({
        ...prev,
        currentTime: time,
      }));
    }
  }, []);

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
    seekTo,
    setVolume,
    toggleMute,
    getVolumeIcon,
    isVolumeControlVisible,
    setIsVolumeControlVisible,
    audioRef,
    handleMouseEnterVolume,
    handleMouseLeaveVolume,
    nextSong,
    previousSong,
    setPlaylist,
  };
};
