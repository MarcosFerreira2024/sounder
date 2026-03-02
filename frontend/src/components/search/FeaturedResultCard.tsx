import Button from "../ui/Button";
import { Pause, Play } from "lucide-react";
import type { SearchResult } from "../../hooks/useSearch";
import useFeatured from "../../hooks/useFeatured";
import { useAudio } from "../../hooks/useAudio";
import Image from "../ui/Image";

type FeaturedResultCardProps = {
  data: SearchResult | null;
  loading: boolean;
};

function FeaturedResultCard({ data, loading }: FeaturedResultCardProps) {
  const { isPlaying, togglePlay } = useAudio();
  const hasFeatured = useFeatured(data);

  if (loading || hasFeatured === undefined || !data) {
    return (
      <article className="flex flex-col gap-2 animate-pulse">
        <div className="h-8 w-48 bg-neutral-800 rounded-md" />

        <div className="flex flex-col lg:flex-row border lg:min-h-[190px] lg:max-h-[190px] rounded-2xl shadow-md overflow-hidden border-neutral-800">
          <div className="flex flex-col gap-4 flex-1 lg:order-0 order-1 p-2 justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-neutral-800 rounded-md" />
              <div className="h-4 w-28 bg-neutral-800 rounded-md" />
            </div>

            <div className="h-8 w-full bg-neutral-800 rounded-xl" />
          </div>

          <figure className="relative lg:order-1 order-0 flex-1">
            <div className="w-full min-h-[300px] md:min-h-[190px]  md:max-h-[300px] bg-neutral-800" />
          </figure>
        </div>
      </article>
    );
  }

  if (!hasFeatured) return null;

  const { featured, handleNavigate, hasMusics, labelMap, musicsFromArtist } =
    hasFeatured;

  return (
    <article className="flex flex-col gap-2 ">
      <h1 className="text-main text-2xl">Melhor Resultado:</h1>

      <div className="flex flex-col lg:flex-row border  lg:min-h-[190px] lg:max-h-[190px]  rounded-2xl shadow-md overflow-hidden border-neutral-800">
        <div className="flex flex-col gap-2 flex-1 lg:order-0 order-1  p-2 justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-main text-base lg:text-xl">{featured.name}</h2>
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

        <figure className="relative lg:order-1 order-0 flex-1 justify-center h-full items-center">
          <Image
            src={featured.image ?? "/not-found.svg"}
            alt={`Imagem de ${featured.name}`}
            className="h-full w-full"
            title={`Imagem de ${featured.name}`}
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
