import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { MediaInfoHeader } from "../MediaInfoHeader";
import { useAudioContext } from "../../contexts/AudioContext";
import { useCollectionContext } from "../../contexts/CollectionContext";

export function MusicHeader({ loading }: { loading?: boolean }) {
  const { selectedSong } = useAudioContext();
  const { collection } = useCollectionContext();

  if (loading) {
    return (
      <MediaInfoHeader
        loading={true}
        showChangePictureModal={() => {}}
        subtitle=""
        image=""
        title=""
      />
    );
  }

  const music = selectedSong || collection?.tracks[0];

  return (
    <MediaInfoHeader
      loading={loading}
      showChangePictureModal={() => {}}
      subtitle={music?.author ?? music?.audio.split(" ")[0] ?? ""}
      image={music?.cover ?? "/not-found.svg"}
      title={music?.name ?? music?.audio.split(" ")[0] ?? ""}
    >
      <Button title="Like" icon={<Heart />} roundedValue="full" size="md" />
    </MediaInfoHeader>
  );
}
