import React from "react";
import Button from "./Button";
import { MoreVertical, Pause, Play } from "lucide-react";
import { useAudioContext } from "../../contexts/AudioContext";

type Music = {
  id: string;
  name: string;
  author: string;
  url: string;
  photo: string;
  duration: string;
  lyrics: string[];
};

type MusicPreviewButtonProps = {
  song: Music;
};

function MusicPreviewButton({ song }: MusicPreviewButtonProps) {
  const { currentMusic, isPlaying, setMusic } = useAudioContext();
  const isThisSongPlaying = isPlaying && currentMusic?.id === song.id;

  return (
    <div
      className={`${
        currentMusic?.id === song.id
          ? "bg-neutral-900 hover:bg-neutral-800"
          : "bg-neutral-950 hover:bg-neutral-900"
      } border border-neutral-800 rounded-2xl h-17.5 flex items-center justify-between px-3`}
    >
      <div className="flex gap-3 items-center">
        <Button
          icon={
            isThisSongPlaying ? (
              <Pause width="16" height="16" />
            ) : (
              <Play width="16" height="16" />
            )
          }
          onClick={() => setMusic(song)}
          size="sm"
          roundedValue="full"
        />
        <img
          src={song.photo}
          className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-800 shadow-2xl"
          alt={`Cover for ${song.name}`}
        />
        <div>
          <p className="text-main text-lg">{song.name}</p>
          <p className="text-opacity text-sm">{song.author}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <p className="text-opacity text-sm">{song.duration}</p>
        <MoreVertical className="text-opacity" />
      </div>
    </div>
  );
}

export default MusicPreviewButton;
