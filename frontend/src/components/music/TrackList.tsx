import { useAudioContext } from "../../contexts/AudioContext";
import type { Music } from "../../hooks/useAudio";
import MusicPreviewButton from "../ui/MusicPreviewButton";
import TrackSkeleton from "./TrackSkeleton";
import { useCollectionContext } from "../../contexts/CollectionContext";

function TrackList() {
  const { collection, loading } = useCollectionContext();
  const { selectedSong } = useAudioContext();

  if (loading || !collection?.tracks || collection.tracks.length === 0)
    return Array.from({ length: 4 }).map((_, index) => (
      <TrackSkeleton index={index} key={index} />
    ));

  const tracksToDisplay =
    collection.type === "recommendation"
      ? collection.tracks.filter((t) => t.id === selectedSong?.id)
      : collection.tracks;

  return tracksToDisplay.map((track: Music) => (
    <MusicPreviewButton
      key={track.id}
      data={track}
      selected={selectedSong?.id === track.id}
    />
  ));
}

export default TrackList;
