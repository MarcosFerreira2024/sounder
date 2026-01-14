import { createContext, useContext } from "react";
import { useAudio } from "../hooks/useAudio";

type AudioContextType = ReturnType<typeof useAudio>;

const AudioContext = createContext<AudioContextType | null>(null);

type AudioProviderProps = {
  children: React.ReactNode;
};

export function AudioProvider({ children }: AudioProviderProps) {
  const audio = useAudio();

  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }

  return context;
}
