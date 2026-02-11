import { createContext, useContext } from "react";
import { useAudio } from "../hooks/useAudio";

type AudioContextType = ReturnType<typeof useAudio>;

const AudioContext = createContext<AudioContextType | null>(null);

type AudioProviderProps = {
  children: React.ReactNode;
};

export function AudioProvider({ children }: AudioProviderProps) {
  const data = useAudio();

  return (
    <AudioContext.Provider value={{ ...data }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudioContext must be used within a AudioProvider");
  }

  return context;
}
