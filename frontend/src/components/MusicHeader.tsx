import { Heart } from "lucide-react";
import Button from "./ui/Button";
import { MediaInfoHeader } from "./MediaInfoHeader";
import { useAudioContext } from "../contexts/AudioContext";

export function MusicHeader() {
  const { selectedSong } = useAudioContext();

  return (
    <MediaInfoHeader
      subtitle={selectedSong?.author ?? "Not Found"}
      image={selectedSong?.cover ?? "/not-found.png"}
      title={selectedSong?.name ?? "Not Found"}
    >
      <Button title="Like" icon={<Heart />} roundedValue="full" size="md" />
    </MediaInfoHeader>
  );
}
