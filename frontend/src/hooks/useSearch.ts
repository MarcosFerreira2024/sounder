import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Music } from "./useAudio";
import type { PublicUser } from "./useProfile";
import type { Playlist } from "./usePlaylist";
import { searchByQuery } from "../actions/search/searchByQuery";

export type QueryType =
  | "all"
  | "artists"
  | "albums"
  | "musics"
  | "playlists"
  | "profiles";

export type Artist = {
  artistId: string;
  userId: string;
  name: string;
  image: string | null;
  about: string | null;
};

export type Album = {
  id: string;
  authorId: string;
  cover: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SearchResult = {
  artists?: PublicUser[];
  albums?: Album[];
  musics?: Music[];
  playlists?: Playlist[];
  profiles?: PublicUser[];
};

function useSearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const q = params.get("q") ?? "";
  const type = (params.get("type") as QueryType) ?? "all";

  const [search, setSearch] = useState(q);
  const [data, setData] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearch(q);
  }, [q]);

  useEffect(() => {
    if (!q) {
      setData(null);
      return;
    }

    let cancelled = false;

    setLoading(true);

    const load = async () => {
      const data = await searchByQuery(q, type);

      console.log(data);

      if (!cancelled) setData(data);

      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [q, type]);

  const handleSearch = () => {
    if (!search) return;
    if (search.length > 40) return;

    navigate(`/search?q=${search}&type=${type ?? "all"}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 40) return;
    setSearch(e.target.value);
  };

  const cancel = () => {
    setSearch("");
    navigate("/search");
  };

  return {
    search,
    q,
    data,
    loading,
    type,
    handleSearch,
    handleChange,
    onKeyDown,
    cancel,
  };
}

export default useSearch;
