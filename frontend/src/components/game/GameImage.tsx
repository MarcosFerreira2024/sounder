import Image from "../ui/Image";
import MusicPreviewButton from "../ui/MusicPreviewButton";

export default function GameImage({ state }: { state: any }) {
  if (!state) return null;

  if (state.audio === undefined) return;

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl border border-neutral-800 relative">
      <Image src={state.image} className="w-full h-full object-cover" />
      <div className="flex items-center absolute bottom-2 left-0 p-4 min-w-full">
        <MusicPreviewButton
          single={true}
          data={{
            audio: state.audio,
            author:
              state.artistName ?? "Descubra o artista que toca essa musica",
            cover: state.image!,
            name: state.musicName || "Artista não foi descoberto",
          }}
        />
      </div>
    </div>
  );
}
