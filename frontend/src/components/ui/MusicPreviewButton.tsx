import { useAudioContext } from "../../contexts/AudioContext";
import type { Music } from "../../hooks/useAudio";
import Button from "./Button";
import { MoreVertical, Pause, Play } from "lucide-react";
import Image from "./Image";

type MusicPreviewButtonProps = {
  selected?: boolean;
  data: Music;
  single?: boolean;
  showControls?: boolean;
};

function MusicPreviewButton({
  selected,
  data,
  single,
  showControls = false,
}: MusicPreviewButtonProps) {
  const { setSelectedSong, togglePlay, isPlaying } = useAudioContext();

  return (
    <div
      onClick={(e) => {
        const { audio, author, cover, name, id, lyrics } = data;

        setSelectedSong({
          audio,
          author,
          cover,
          name,
          id,
          lyrics,
        });

        togglePlay(e, {
          audio,
          author,
          cover,
          name,
          id,
          lyrics,
        });
      }}
      className={`${
        selected
          ? "bg-neutral-900 hover:bg-neutral-800  outline-none ring-2 ring-neutral-600 duration-200 ease-in-out"
          : "bg-neutral-950 hover:bg-neutral-900"
      } border border-neutral-800 rounded-2xl min-h-17.5 max-h-17.5  flex-nowrap shrink-0   flex items-center shadow-md justify-between px-2 flex-1`}
    >
      <div className="flex gap-3 items-center">
        <Button
          icon={
            (single && isPlaying) || (selected && isPlaying) ? (
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
        <Image
          src={data.cover}
          className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-800 shadow-md"
          alt={`Cover for ${data.name}`}
          title={`Cover for ${data.name}`}
        />
        <div>
          <p className="text-main text-sm md:text-base lg:text-lg ">
            {data.name}
          </p>
          <p className="text-opacity text-sm">{data.author}</p>
        </div>
      </div>
      {showControls && (
        <div className="flex gap-3 items-center">
          <MoreVertical className="text-opacity" />
        </div>
      )}
    </div>
  );
}

export default MusicPreviewButton;
