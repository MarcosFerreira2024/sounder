import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAudioContext } from "../contexts/AudioContext";

export default function AudioRouteHandler() {
  const location = useLocation();
  const { pauseAudio, resetAudio, setSelectedSong, setPlaylist } = useAudioContext();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const isHome = location.pathname === "/";
    const wasHome = prevPathname.current === "/";

    if (isHome !== wasHome) {
      pauseAudio();
      resetAudio();
      setSelectedSong(null);
      setPlaylist([]);
    }
    
    prevPathname.current = location.pathname;
  }, [location.pathname, pauseAudio, resetAudio, setSelectedSong, setPlaylist]);

  return null;
}
