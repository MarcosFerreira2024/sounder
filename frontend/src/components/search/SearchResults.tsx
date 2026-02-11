import { useNavigate } from "react-router-dom";
import SearchSection from "./SearchSection";
import MediaCardList from "../ui/MediaCardList";
import ImageDisplayCardList from "../ui/ImageDisplayCardList";
import type { QueryType, SearchResult } from "../../hooks/useSearch";
import { hasResults } from "../../helpers/hasResults";

type SearchProps = {
  data: SearchResult | null;
  type: QueryType;
};

export function SearchResults({ data, type }: SearchProps) {
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const hasAnyResult = hasResults(data, type);

  if (!hasAnyResult) {
    return (
      <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
        <p className="text-opacity text-xl">
          Não há resultados para essa busca
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 p-4  bg-neutral-950  overflow-y-scroll rounded-2xl border border-neutral-800">
      <SearchSection title="Músicas" items={data?.musics}>
        {(musics) => (
          <MediaCardList
            className="min-w-43.75 min-h-43.75 max-w-43.75 min-h-43.75"
            data={musics.map((music) => ({
              image: music.cover ?? null,
              title: music.name,
              onClick: () => navigate("/music/" + music.id),
            }))}
          />
        )}
      </SearchSection>

      <SearchSection title="Artistas" items={data?.artists}>
        {(artists) => (
          <ImageDisplayCardList
            className="min-w-43.75 min-h-43.75 max-w-43.75 min-h-43.75"
            data={artists.map((artist) => ({
              image: artist.image ?? null,
              onClick: () => navigate("/profile/" + artist.id),
            }))}
          />
        )}
      </SearchSection>
      <SearchSection title="Álbuns" items={data?.albums}>
        {(albums) => (
          <ImageDisplayCardList
            className="min-w-43.75 min-h-43.75 max-w-43.75 min-h-43.75"
            data={albums.map((album) => ({
              image: album.cover ?? null,
              onClick: () => navigate("/album/" + album.id),
            }))}
          />
        )}
      </SearchSection>
      <SearchSection title="Playlists" items={data?.playlists}>
        {(playlists) => (
          <ImageDisplayCardList
            className="min-w-43.75 min-h-43.75 max-w-43.75 min-h-43.75"
            data={playlists.map((playlist) => ({
              image: playlist.image ?? null,
              onClick: () => navigate("/playlist/" + playlist.id),
            }))}
          />
        )}
      </SearchSection>
      <SearchSection title="Perfis" items={data?.profiles}>
        {(profiles) => (
          <ImageDisplayCardList
            className="min-w-43.75 min-h-43.75 max-w-43.75 min-h-43.75"
            data={profiles.map((profile) => ({
              image: profile.image ?? null,
              onClick: () => navigate("/profile/" + profile.id),
            }))}
          />
        )}
      </SearchSection>
    </div>
  );
}

export default SearchResults;
