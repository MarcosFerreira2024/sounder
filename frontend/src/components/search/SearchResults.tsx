import type { QueryType, SearchResult } from "../../hooks/useSearch";
import { hasResults } from "../../helpers/hasResults";
import CarouselSection from "../ui/CarouselSection";
import DisplayCardList from "../ui/DisplayCardList";

export type SearchProps = {
  data: SearchResult | null;
  type: QueryType;
  loading: boolean;
};

export function SearchResults({ data, type, loading }: SearchProps) {
  const hasAnyResult = hasResults(type, loading, data);

  if (hasAnyResult === false) {
    return (
      <div className="flex flex-col gap-4 items-center p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
        <h1 className="text-xl  text-opacity">Nenhum resultado encontrado.</h1>
      </div>
    );
  }
  if (loading)
    return (
      <div>
        <h1 className="text-xl text-opacity">
          Aguarde enquanto carregamos os dados
        </h1>
      </div>
    );
  return (
    <>
      <CarouselSection
        loading={loading}
        title="Músicas"
        items={data?.musics}
        mapItem={(music) => ({
          image: music.cover ?? null,
          title: music.name,
          to: "/music/" + music.id,
          imageClassName:
            "lg:min-w-43.75 lg:min-h-43.75 lg:max-w-43.75 lg:min-h-43.75 min-w-32 min-h-32 max-w-32 min-h-32",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) => (
          <DisplayCardList loading={loading} data={mappedItems} />
        )}
      />

      <CarouselSection
        title="Artistas"
        items={data?.artists}
        loading={loading}
        mapItem={(artist) => ({
          image: artist.image ?? null,
          to: "/profile/" + artist.userId,
          title: artist.name,

          imageClassName:
            "lg:min-w-43.75 lg:min-h-43.75 lg:max-w-43.75 lg:min-h-43.75 min-w-32 min-h-32 max-w-32 min-h-32",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) => (
          <DisplayCardList loading={loading} data={mappedItems} />
        )}
      />

      <CarouselSection
        loading={loading}
        title="Álbuns"
        items={data?.albums}
        mapItem={(album) => ({
          image: album.cover ?? null,
          title: album.name,

          to: "/album/" + album.id,
          imageClassName:
            "lg:min-w-43.75 lg:min-h-43.75 lg:max-w-43.75 lg:min-h-43.75 min-w-32 min-h-32 max-w-32 min-h-32",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) => (
          <DisplayCardList loading={loading} data={mappedItems} />
        )}
      />

      <CarouselSection
        loading={loading}
        title="Playlists"
        items={data?.playlists}
        mapItem={(playlist) => ({
          image: playlist.image ?? null,
          title: playlist.name,

          to: "/playlist/" + playlist.id,
          imageClassName:
            "lg:min-w-43.75 lg:min-h-43.75 lg:max-w-43.75 lg:min-h-43.75 min-w-32 min-h-32 max-w-32 min-h-32",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) => {
          return <DisplayCardList loading={loading} data={mappedItems} />;
        }}
      />

      <CarouselSection
        loading={loading}
        title="Perfis"
        items={data?.profiles}
        mapItem={(profile) => ({
          image: profile.image ?? null,
          to: "/profile/" + profile.id,
          title: profile.name,

          imageClassName:
            "lg:min-w-43.75 lg:min-h-43.75 lg:max-w-43.75 lg:min-h-43.75 min-w-32 min-h-32 max-w-32 min-h-32",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) => (
          <DisplayCardList loading={loading} data={mappedItems} />
        )}
      />
    </>
  );
}

export default SearchResults;
