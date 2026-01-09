import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const useAudio = (src: string) => {
  // ----------------------------
  // Refs
  // ----------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeControlTimeout = useRef<number | null>(null);

  // ----------------------------
  // State
  // ----------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);

  // ----------------------------
  // Metadata da música
  // ----------------------------
  const author_photo = "artist-mock-photo.jpeg";
  const music_name = "Glimpse of Us";
  const author_name = "Joji";

  // ----------------------------
  // Letras da música
  // ----------------------------
  const lyrics = [
    "[00:17.00]She'd take the world off my shoulders",
    "[00:20.60]If it was ever hard to move",
    "[00:25.58]She'd turn the rain to a rainbow",
    "[00:29.05]When I was living in the blue",
    "[00:33.88]Why then, if she's so perfect?",
    "[00:37.11]Do I still wish that it was you?",
    "[00:42.45]Perfect don't mean that it's working",
    "[00:45.47]So what can I do? (Ooh)",
    "[00:49.21] 🎵",
    "[00:49.93]When you're out of sight in my mind",
    "[00:57.96] 🎵",
    "[00:58.51]'Cause sometimes I look in her eyes",
    "[01:02.08]And that's where I find a glimpse of us",
    "[01:07.12]And I try to fall for her touch",
    "[01:10.75]But I'm thinking of the way it was",
    '[01:15.57]Said, "I\'m fine" and said, "I moved on"',
    "[01:19.45]I'm only here passing time in her arms",
    "[01:23.74]Hoping I'll find a glimpse of us",
    "[01:31.47] 🎵",
    "[01:33.55]Tell me he savors your glory",
    "[01:36.94]Does he laugh the way I did?",
    "[01:41.47]Is this a part of your story?",
    "[01:45.03]One that I had never lived",
    "[01:50.54]Maybe one day you'll feel lonely",
    "[01:53.60]And in his eyes, you'll get a glimpse",
    "[01:59.06]Maybe you'll start slippin' slowly and find me again",
    "[02:06.21] 🎵",
    "[02:06.62]When you're out of sight in my mind",
    "[02:14.67] 🎵",
    "[02:15.12]'Cause sometimes I look in her eyes",
    "[02:18.74]And that's where I find a glimpse of us",
    "[02:23.72]And I try to fall for her touch",
    "[02:27.64]But I'm thinking of the way it was",
    '[02:32.28]Said, "I\'m fine" and said, "I moved on"',
    "[02:36.12]I'm only here passing time in her arms",
    "[02:40.49]Hoping I'll find a glimpse of us",
    "[02:48.28] 🎵",
    "[02:48.86]Ooh-ooh-ooh",
    "[02:53.95]Ooh-ooh-ooh",
    "[03:00.48] 🎵",
    "[03:01.79]'Cause sometimes I look in her eyes",
    "[03:05.42]And that's where I find a glimpse of us",
    "[03:10.21]And I try to fall for her touch",
    "[03:14.00]But I'm thinking of the way it was",
    '[03:18.59]Said, "I\'m fine" and said, "I moved on"',
    "[03:22.58]I'm only here passing time in her arms",
    "[03:26.91]Hoping I'll find a glimpse of us",
  ];

  // ----------------------------
  // Volume controls
  // ----------------------------
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

  // ----------------------------
  // Effects: inicialização do audio, play/pause e volume
  // ----------------------------
  useEffect(() => {
    if (typeof Audio === "undefined") return;
    audioRef.current = new Audio(src);
    const audio = audioRef.current;
    audio.volume = volume;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
      setAlreadyPlayed(true);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ----------------------------
  // Funções de controle de playback
  // ----------------------------
  const play = () => {
    setIsPlaying(true);
    if (!alreadyPlayed) setAlreadyPlayed(true);
  };

  const pause = () => setIsPlaying(false);

  const togglePlayPause = () => {
    if (audioRef.current && audioRef.current.ended) {
      seek(0);
      play();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    if (!isFinite(time) || !isFinite(duration) || duration <= 0) return;
    try {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    } catch (error) {
      console.error("Error setting currentTime in seek:", error, time);
    }
  };

  const seekForward = (amount: number = 10) => {
    if (!audioRef.current || !isFinite(duration)) return;
    const newTime = audioRef.current.currentTime + amount;
    if (newTime > duration) seek(0);
    else seek(newTime);
    setIsPlaying(true);
  };

  const seekBackward = (amount: number = 10) => {
    if (!audioRef.current || !isFinite(duration)) return;
    const newTime = Math.max(audioRef.current.currentTime - amount, 0);
    seek(newTime);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const progressBar = e.currentTarget;
    const clickPositionX = e.clientX - progressBar.getBoundingClientRect().left;
    const seekTime = (clickPositionX / progressBar.offsetWidth) * duration;
    seek(seekTime);
  };

  // ----------------------------
  // Retorno do hook
  // ----------------------------
  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    alreadyPlayed,
    author_name,
    author_photo,
    music_name,
    lyrics,
    isVolumeControlVisible,
    play,
    pause,
    togglePlayPause,
    seek,
    seekForward,
    seekBackward,
    setVolume,
    formatTime,
    toggleMute,
    setAlreadyPlayed,
    handleProgressClick,
    getVolumeIcon,
    onVolumeChange,
    handleMouseLeaveVolumeControl,
    handleMouseEnterVolumeControl,
  };
};
