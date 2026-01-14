import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Music = {
  id: string;
  name: string;
  author: string;
  url: string;
  photo: string;
  duration: string;
  lyrics: string[];
};

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeControlTimeout = useRef<number | null>(null);

  const [currentMusic, setCurrentMusic] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);

  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (currentMusic) {
      audioRef.current = new Audio(currentMusic.url);
      audioRef.current.volume = volume;

      const setAudioData = () => {
        setDuration(audioRef.current!.duration);
        setCurrentTime(audioRef.current!.currentTime);
      };
      const setAudioTime = () => setCurrentTime(audioRef.current!.currentTime);
      const handleEnded = () => setIsPlaying(false);

      audioRef.current.addEventListener("loadeddata", setAudioData);
      audioRef.current.addEventListener("timeupdate", setAudioTime);
      audioRef.current.addEventListener("ended", handleEnded);

      if (isPlaying) {
        audioRef.current.play();
        if (!alreadyPlayed) setAlreadyPlayed(true);
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("loadeddata", setAudioData);
          audioRef.current.removeEventListener("timeupdate", setAudioTime);
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, [currentMusic]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
      if (!alreadyPlayed) setAlreadyPlayed(true);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    if (currentMusic) {
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentMusic) {
      setIsPlaying(!isPlaying);
    }
  };

  const setMusic = (music: Music) => {
    if (currentMusic?.id === music.id) {
      togglePlayPause();
    } else {
      setCurrentMusic(music);
      setIsPlaying(true);
    }
  };

  const selectMusic = (music: Music) => {
    setCurrentMusic(music);
  };

  const seek = (time: number) => {
    if (
      !audioRef.current ||
      !isFinite(time) ||
      !isFinite(duration) ||
      duration <= 0
    )
      return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const seekBackward = (amount: number = 10) => {
    if (!audioRef.current || !isFinite(duration)) return;
    const newTime = Math.max(audioRef.current.currentTime - amount, 0);
    seek(newTime);
    setIsPlaying(true);
  };

  const seekForward = (amount: number = 10) => {
    if (!audioRef.current || !isFinite(duration)) return;
    const newTime = audioRef.current.currentTime + amount;
    if (newTime > duration) seek(0);
    else seek(newTime);
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const progressBar = e.currentTarget;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const seekTime = (clickPositionX / progressBar.offsetWidth) * duration;
    seek(seekTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseEnterVolumeControl = () => {
    if (volumeControlTimeout.current)
      clearTimeout(volumeControlTimeout.current);
    setIsVolumeControlVisible(true);
  };

  const handleMouseLeaveVolumeControl = () => {
    volumeControlTimeout.current = window.setTimeout(() => {
      setIsVolumeControlVisible(false);
    }, 200);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume < 0.5) return <Volume1 />;
    return <Volume2 />;
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  return {
    currentMusic,
    isPlaying,
    currentTime,
    duration,
    volume,
    isVolumeControlVisible,
    lyrics: currentMusic?.lyrics ?? [],
    alreadyPlayed,
    play,
    setMusic,
    selectMusic,
    togglePlayPause,
    seek,
    seekBackward,
    seekForward,
    handleProgressClick,
    formatTime,
    getVolumeIcon,
    onVolumeChange,
    toggleMute,
    handleMouseEnterVolumeControl,
    handleMouseLeaveVolumeControl,
  };
};
