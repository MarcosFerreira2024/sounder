import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { MediaInfoHeader } from "../MediaInfoHeader";
import { useAudioContext } from "../../contexts/AudioContext";

export function MusicHeader({ loading }: { loading?: boolean }) {
  const { selectedSong } = useAudioContext();

  console.log(selectedSong);

  return (
    <MediaInfoHeader
      loading={loading}
      showChangePictureModal={() => {}}
      subtitle={selectedSong?.author ?? selectedSong?.audio.split(" ")[0] ?? ""}
      image={selectedSong?.cover ?? "/not-found.svg"}
      title={selectedSong?.name ?? selectedSong?.audio.split(" ")[0] ?? ""}
    >
      <Button title="Like" icon={<Heart />} roundedValue="full" size="md" />
    </MediaInfoHeader>
  );
}
