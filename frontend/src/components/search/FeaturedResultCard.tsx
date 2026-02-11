import Button from "../ui/Button";
import { Pause, Play } from "lucide-react";
import type { SearchResult } from "../../hooks/useSearch";
import useFeatured from "../../hooks/useFeatured";
import { useAudio } from "../../hooks/useAudio";

type FeaturedResultCardProps = {
  data: SearchResult | null;
};

function FeaturedResultCard({ data }: FeaturedResultCardProps) {
  const { isPlaying, togglePlay } = useAudio();
  const hasFeatured = useFeatured(data);
  if (!hasFeatured) return null;

  const { featured, handleNavigate, hasMusics, labelMap, musicsFromArtist } =
    hasFeatured;

  return (
    <article className="flex flex-col gap-2">
      <h1 className="text-main text-2xl">Melhor Resultado:</h1>

      <div className="flex border min-h-[190px] max-h-[190px] rounded-2xl shadow-md overflow-hidden border-neutral-800">
        <div className="flex flex-col flex-1 max-w-80 p-2 justify-between">
          <div>
            <h2 className="text-main text-xl">{featured.name}</h2>
            <p className="text-opacity">{labelMap[featured.type]}</p>
          </div>

          <Button
            onClick={handleNavigate}
            size="sm"
            roundedValue="xl"
            variant="opacity"
          >
            Ver {labelMap[featured.type]}
          </Button>
        </div>

        <figure className="relative flex flex-1 justify-center items-center">
          <img
            src={featured.image ?? "/not-found.png"}
            className="object-cover flex-1 min-w-full min-h-full"
            alt={`Imagem de ${featured.name}`}
          />

          {featured.type === "artists" && hasMusics && (
            <Button
              icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
              onClick={(e) => togglePlay(e, musicsFromArtist[0])}
              size="sm"
              roundedValue="xl"
              className="absolute top-2 right-2"
            />
          )}
        </figure>
      </div>
    </article>
  );
}

export default FeaturedResultCard;
