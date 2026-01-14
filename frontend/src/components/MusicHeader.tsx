import { Heart } from "lucide-react";
import Button from "./ui/Button";
import { useAudioContext } from "../contexts/AudioContext";
import { MediaInfoHeader } from "./MediaInfoHeader";

export function MusicHeader() {
  const { currentMusic } = useAudioContext();

  const image = currentMusic?.photo ?? "/music-cover-mock.png";
  const title = currentMusic?.name ?? "No music selected";

  return (
    <MediaInfoHeader subtitle={"teste"} image={image} title={title}>
      <Button title="Like" icon={<Heart />} roundedValue="full" size="md" />
    </MediaInfoHeader>
  );
}
