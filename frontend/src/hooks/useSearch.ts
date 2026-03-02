import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Music } from "./useAudio";
import type { Playlist } from "./usePlaylist";
import { searchByQuery } from "../actions/search/searchByQuery";
import { useAppNotifications } from "../contexts/NotificationsContext";
import type { User } from "./useUser";

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
  artists?: Artist[];
  albums?: Album[];
  musics?: Music[];
  playlists?: Playlist[];
  profiles?: User[];
};

function useSearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const q = params.get("q") ?? "";
  const type = (params.get("type") as QueryType) ?? "all";

  const [search, setSearch] = useState(q);
  const [data, setData] = useState<SearchResult | null>(null);
  const { setNotification } = useAppNotifications();
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
      try {
        const data = await searchByQuery(q, type);

        if (!cancelled) setData(data);
      } catch (error: any) {
        setNotification(error.message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
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
