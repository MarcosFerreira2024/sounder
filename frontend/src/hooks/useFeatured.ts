import { useNavigate } from "react-router-dom";
import type { SearchResult } from "./useSearch";
import type { QueryType } from "./useSearch";
import type { Music } from "./useAudio";

type TargetResult = {
  type: Exclude<QueryType, "all">;
  id: string;
  name: string;
  image?: string;
};

function useFeatured(data: SearchResult | null) {
  const navigate = useNavigate();

  if (!data) return null;

  const target = (): TargetResult | null => {
    if (data.musics?.[0]) {
      const music = data.musics[0];
      return {
        type: "musics",
        id: music.id!,
        name: music.name,
        image: music.cover ?? "/not-found.svg",
      };
    }
    if (data.playlists?.[0]) {
      const playlist = data.playlists[0];
      return {
        type: "playlists",
        id: playlist.id,
        name: playlist.name,
        image: playlist.image ?? "/not-found.svg",
      };
    }
    if (data.artists?.[0]) {
      const artist = data.artists[0];
      return {
        type: "artists",
        id: artist.userId,
        name: artist.name,
        image: artist.image ?? "/not-found.svg",
      };
    }

    if (data.albums?.[0]) {
      const album = data.albums[0];
      return {
        type: "albums",
        id: album.id,
        name: album.name,
        image: album.cover ?? "/not-found.svg",
      };
    }

    if (data.profiles?.[0]) {
      const profile = data.profiles[0];
      return {
        type: "profiles",
        id: profile.id!,
        name: profile.name!,
        image: profile.image ?? "/not-found.svg",
      };
    }

    return null;
  };

  const featured = target();
  if (!featured) return null;

  const musicsFromArtist: Music[] =
    featured.type === "artists" && data.musics
      ? data.musics.filter((music) => music.author === featured.name)
      : [];

  const hasMusics = musicsFromArtist.length > 0;

  const labelMap = {
    artists: "Artista",
    albums: "Álbum",
    musics: "Música",
    playlists: "Playlist",
    profiles: "Perfil",
  } as const;

  const handleNavigate = () => {
    switch (featured.type) {
      case "artists":
        return navigate(`/profile/${featured.id}`);

      case "playlists":
        return navigate(`/playlist/${featured.id}`);

      case "profiles":
        return navigate(`/profile/${featured.id}`);

      case "albums":
        return navigate(`/album/${featured.id}`);

      case "musics":
        return navigate(`/music/${featured.id}`);

      default:
        return;
    }
  };

  return {
    featured,
    musicsFromArtist,
    hasMusics,
    labelMap,
    handleNavigate,
  };
}

export default useFeatured;
