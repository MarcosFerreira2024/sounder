import { useAudioContext } from "../../contexts/AudioContext";
import type { Music } from "../../hooks/useAudio";
import Button from "./Button";
import { MoreVertical, Pause, Play } from "lucide-react";

type MusicPreviewButtonProps = {
  selected: boolean;
  data: Music;
};

function MusicPreviewButton({ selected, data }: MusicPreviewButtonProps) {
  const { setSelectedSong, togglePlay, isPlaying } = useAudioContext();
  return (
    <div
      onClick={(e) => {
        setSelectedSong(data);
        togglePlay(e, data);
      }}
      className={`${
        selected
          ? "bg-neutral-900 hover:bg-neutral-800  outline-none ring-2 ring-neutral-600 duration-200 ease-in-out"
          : "bg-neutral-950 hover:bg-neutral-900"
      } border border-neutral-800 rounded-2xl h-17.5 flex items-center justify-between px-3`}
    >
      <div className="flex gap-3 items-center">
        <Button
          icon={
            selected && isPlaying ? (
              <Pause width="16" height="16" />
            ) : (
              <Play width="16" height="16" />
            )
          }
          onClick={(e) => {
            setSelectedSong(data);
            togglePlay(e, data);
          }}
          size="sm"
          roundedValue="full"
        />
        <img
          src={data.cover}
          className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-800 shadow-md"
          alt={`Cover for ${data.name}`}
          title={`Cover for ${data.name}`}
        />
        <div>
          <p className="text-main text-lg">{data.name}</p>
          <p className="text-opacity text-sm">{data.author}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <MoreVertical className="text-opacity" />
      </div>
    </div>
  );
}

export default MusicPreviewButton;
