import { Heart } from "lucide-react";
import Button from "./Button";

export function PlayListHeader() {
  const { playlistName, playlistPhoto, playListMusicsTotal } =
    usePlaylistContext();
  return (
    <div className=" py-2 flex justify-between items-center px-4  bg-neutral-950 w-full rounded-2xl">
      <div className="flex items-start gap-2 ">
        <img
          src={playlistPhoto}
          className="rounded-full border border-neutral-900 w-18 h-18"
          alt={playlistName}
        />
        <div className="flex flex-col  font-inter">
          <h1 className="text-neutral-100 text-2xl">{playlistName}</h1>
          <p className="text-neutral-400 text-base">
            {playListMusicsTotal} músicas
          </p>
        </div>
      </div>
      <div>
        <Button title="Like" icon={<Heart />} roundedValue="full" size="md" />
      </div>
    </div>
  );
}
