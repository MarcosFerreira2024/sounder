import {
  Heart,
  X,
  Play,
  Pause,
  RotateCcw,
  MicVocal,
  RotateCw,
} from "lucide-react";
import Button from "../ui/Button";
import { useAudioContext } from "../../contexts/AudioContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Image from "../ui/Image";
import useMusicActions from "../../hooks/useMusicActions";
import { MusicCoverSkeleton } from "./MusicCoverSkeleton";
import { AddTracksToPlaylistModal } from "../playlist/AddTracksToPlaylistModal";

export function MusicCover({
  toggleLyricsVisibilty,
  showExtraControls = true,
  image,
  loading,
}: {
  isLyricsVisible: boolean;
  toggleLyricsVisibilty: () => void;
  showExtraControls?: boolean;
  image?: string;
  loading?: boolean;
}) {
  const {
    isPlaying,
    playAudio,
    formatTime,
    songState,
    seekBackward,
    seekForward,
    seekTo,
    setVolume,
    getVolumeIcon,
    isVolumeControlVisible,
    toggleMute,
    togglePlay,
    handleMouseEnterVolume,
    handleMouseLeaveVolume,
    selectedSong,
  } = useAudioContext();

  const coverImage = image || selectedSong?.cover || "/not-found.svg";

  const {
    handleSelection,
    isVisible,
    handleDislike,
    loadingPlaylists,
    playlists,
    selected,
    handleAddMusicToPlaylist,
    handleCloseModal,
    open,
  } = useMusicActions();

  if (loading)
    return <MusicCoverSkeleton showExtraControls={showExtraControls} />;

  return (
    <>
      {isVisible && (
        <AddTracksToPlaylistModal
          loadingPlaylists={loadingPlaylists}
          handleClose={handleCloseModal}
          selectedSong={selectedSong}
          handleAddMusicToPlaylist={handleAddMusicToPlaylist}
          onTogglePlaylist={handleSelection}
          playlists={playlists}
          selectedPlaylistIds={selected}
        />
      )}

      <div className="relative overflow-hidden">
        <div className="absolute  right-2 top-2 z-10">
          <Button
            onClick={toggleLyricsVisibilty}
            size="md"
            roundedValue="full"
            icon={<MicVocal />}
            title="Close"
          />
        </div>
        <Image
          src={coverImage}
          className="border border-neutral-900 object-cover  max-h-[300px] h-full lg:max-h-full  h-full w-full    shadow-xl rounded-2xl "
          alt="Music Cover"
          onClick={togglePlay}
        />

        {showExtraControls && (
          <div className="absolute w-full px-2 top-[50%]">
            <div className="justify-between w-full flex items-center ">
              <Button
                size="md"
                roundedValue="full"
                icon={<X />}
                onClick={() => handleDislike(selectedSong!.id!)}
                title="Dislike"
              />
              <Button
                size="md"
                roundedValue="full"
                onClick={open}
                icon={<Heart />}
                title="Add to playlist"
              />
            </div>
          </div>
        )}
        <div className="absolute bottom-2 px-2 w-full">
          <div className=" w-full bg-neutral-950 border border-neutral-900 rounded-2xl h-auto px-4 py-2 bottom-2 flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
              <Button
                size="md"
                roundedValue="full"
                icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
              />
              <div className="w-full flex justify-between text-sm font-inter max-w-[400px] items-center gap-2 text-neutral-400">
                <span className="min-w-[4ch]">
                  {formatTime(songState.currentTime)}
                </span>
                <div
                  className="w-full bg-neutral-800 rounded-full h-1 flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = x / rect.width;
                    seekTo(percentage * songState.duration);
                    playAudio();
                  }}
                >
                  <div
                    className="bg-neutral-100 h-1  rounded-full"
                    style={{
                      width: `${(songState.currentTime / songState.duration) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="min-w-[4ch]">
                  {formatTime(songState.duration)}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  roundedValue="full"
                  icon={<RotateCcw />}
                  onClick={() => seekBackward()}
                  title="-10s"
                />
                <Button
                  size="sm"
                  roundedValue="full"
                  icon={<RotateCw />}
                  onClick={() => seekForward()}
                  title="+10s"
                />
                <div
                  className="relative "
                  onMouseOver={handleMouseEnterVolume}
                  onMouseOut={handleMouseLeaveVolume}
                >
                  <Button
                    size="sm"
                    roundedValue="full"
                    onMouseOver={handleMouseEnterVolume}
                    icon={getVolumeIcon()}
                    onClick={toggleMute}
                    title={songState.volume > 0 ? "Mute" : "Unmute"}
                  />

                  <AnimatePresence>
                    {isVolumeControlVisible && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-neutral-900 p-2 rounded-lg"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          color="000"
                          value={songState.volume}
                          onChange={(e) =>
                            setVolume(parseFloat(e.target.value))
                          }
                          style={{
                            writingMode: "vertical-lr",
                            direction: "rtl",
                          }}
                          className="h-24 w-1  bg-neutral-900 rounded-full cursor-pointer"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
