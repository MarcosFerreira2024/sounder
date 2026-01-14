import { Heart, X, Play, Pause, RotateCcw, MicVocal } from "lucide-react";
import Button from "./ui/Button";
import { useAudioContext } from "../contexts/AudioContext";
export function MusicCover({
  toggleLyricsVisibilty,
  isLyricsVisible,
  showExtraControls = true, // Default to true for backward compatibility
}: {
  isLyricsVisible: boolean;
  toggleLyricsVisibilty: () => void;
  showExtraControls?: boolean;
}) {
  const {
    togglePlayPause,
    isPlaying,
    formatTime,
    currentTime,
    handleProgressClick,
    duration,
    seekBackward,
    seekForward,
    handleMouseEnterVolumeControl,
    handleMouseLeaveVolumeControl,
    getVolumeIcon,
    volume,
    isVolumeControlVisible,
    toggleMute,
    onVolumeChange,
  } = useAudioContext();

  return (
    <div
      style={{ maxHeight: "calc(100dvh - 84px - 100px)" }}
      className={`relative  ${
        isLyricsVisible ? "max-w-[60%]" : "max-w-full"
      } w-full min-h-150 "`}
    >
      <div className="absolute  right-2 top-2">
        <Button
          onClick={toggleLyricsVisibilty}
          size="md"
          roundedValue="full"
          icon={<MicVocal />}
          title="Close"
        />
      </div>
      <img
        src="/music-cover-mock.png"
        className="border border-neutral-900 object-cover w-full h-full shadow-xl rounded-2xl "
        alt="Music Cover"
        onClick={togglePlayPause}
      />

      {showExtraControls && (
        <div className="absolute w-full px-2 top-[50%]">
          <div className="justify-between w-full flex items-center ">
            <Button size="md" roundedValue="full" icon={<X />} title="Close" />
            <Button
              size="md"
              roundedValue="full"
              icon={<Heart />}
              title="Like"
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
              icon={isPlaying ? <Pause /> : <Play />}
              onClick={togglePlayPause}
              title={isPlaying ? "Pause" : "Play"}
            />
            <div className="w-full flex justify-between text-sm font-inter max-w-[400px] items-center gap-2 text-neutral-400">
              <span className="min-w-[4ch]">{formatTime(currentTime)}</span>
              <div
                className="w-full bg-neutral-800 rounded-full  h-1 flex items-center cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-neutral-100 h-1  rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <span className="min-w-[4ch]">{formatTime(duration)}</span>
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
                icon={<RotateCcw />}
                onClick={() => seekForward()}
                title="+10s"
              />
              <div
                className="relative flex"
                onMouseEnter={handleMouseEnterVolumeControl}
                onMouseLeave={handleMouseLeaveVolumeControl}
              >
                <Button
                  size="sm"
                  roundedValue="full"
                  icon={getVolumeIcon()}
                  onClick={toggleMute}
                  title={volume > 0 ? "Mute" : "Unmute"}
                />
                {isVolumeControlVisible && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-neutral-900 p-2 rounded-lg">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      color="000"
                      value={volume}
                      onChange={onVolumeChange}
                      style={{ writingMode: "vertical-lr", direction: "rtl" }}
                      className="h-24 w-1  bg-neutral-900 rounded-full cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
