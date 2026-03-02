import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Music } from "./useAudio";
import getPlaylistById from "../actions/playlists/getById";
import getMusicsByPlaylistId from "../actions/music/getMusicsByPlaylistId";
import getRecommendations from "../actions/music/getRecommendations";
import { useAppNotifications } from "../contexts/NotificationsContext";
import getMusicsByAlbumId from "../actions/album/getMusicsByAlbumId";
import getMusicById from "../actions/music/getMusicById";

type CollectionType = "album" | "playlist" | "recommendation" | "music";

export type Collection = {
  id: string;
  name: string;
  image: string;
  tracks: Music[];
  visibility?: "PUBLIC" | "PRIVATE";
  type: CollectionType;

  capabilities?: {
    canRename: boolean;
    canDelete: boolean;
    canChangeVisibility: boolean;
  };
  ownerId?: string;
};

const NO_MORE_RECOMMENDATIONS_ERROR =
  "Você já interagiu com todas as músicas disponíveis. Este projeto é apenas uma demonstração e possui um conjunto limitado de dados, cheque também os jogos diários.";

export function useCollection(type: CollectionType, id?: string) {
  const { setNotification } = useAppNotifications();

  const playlistQuery = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylistById(id!),
    enabled: type === "playlist" && !!id,
    staleTime: 1000 * 60,
  });

  const musicsQuery = useQuery({
    queryKey: ["musics", id],
    queryFn: () => getMusicsByPlaylistId(id!),
    enabled: type === "playlist" && !!id,
    staleTime: 1000 * 60,
  });

  const musicById = useQuery({
    queryKey: ["music", id],
    queryFn: () => getMusicById(id!),
    enabled: type === "music" && !!id,
    staleTime: 1000 * 60,
  });

  const albumQuery = useQuery({
    queryKey: ["album", id],
    queryFn: () => getMusicsByAlbumId(id!),

    enabled: type === "album" && !!id,
    staleTime: 1000 * 60,
  });

  const recommendationQuery = useQuery({
    queryKey: ["recommendations"],
    queryFn: getRecommendations,
    enabled: type === "recommendation",
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    const error =
      playlistQuery.error ||
      musicsQuery.error ||
      albumQuery.error ||
      recommendationQuery.error ||
      musicById.error;

    if (
      error instanceof Error &&
      error.message !== NO_MORE_RECOMMENDATIONS_ERROR
    ) {
      setNotification(error.message);
    }
  }, [
    playlistQuery.error,
    musicsQuery.error,
    albumQuery.error,
    recommendationQuery.error,
    setNotification,
  ]);

  let collection: Collection | null = null;
  const loading =
    type === "playlist"
      ? playlistQuery.isLoading || musicsQuery.isLoading
      : type === "album"
        ? albumQuery.isLoading
        : type === "music"
          ? musicById.isLoading
          : recommendationQuery.isLoading;

  if (type === "playlist" && playlistQuery.data && musicsQuery.data) {
    collection = {
      ...playlistQuery.data,
      tracks: musicsQuery.data,
      type: "playlist",
      capabilities: {
        canRename: true,
        canDelete: true,
        canChangeVisibility: true,
      },
    };
  }

  if (type === "music" && musicById.data) {
    console.log(musicById.data);
    collection = {
      id: musicById.data.id,
      name: musicById.data.name,
      image: musicById.data.cover || "/not-found.svg",
      tracks: [musicById.data],
      ownerId: musicById.data.artistId,
      type: "music",
    };
  }

  if (type === "album" && albumQuery.data) {
    collection = {
      ...albumQuery.data,
      image: albumQuery.data.cover || "/not-found.svg",
      tracks: albumQuery.data.musics.map((music: Music) => ({
        ...music,
        cover: music.cover || "/not-found.svg",
        lyrics: music.lyrics || "",
      })),
      type: "album",
    };
  }

  if (type === "recommendation") {
    const musics = recommendationQuery.data || [];

    collection = {
      id: "recommendation",
      name: "Recomendados",
      image: musics[0]?.cover || "/not-found.svg",
      tracks: musics.map((music) => ({
        ...music,
        cover: music.cover || "/not-found.svg",
      })),
      type: "recommendation",
    };
  }

  return {
    collection,
    loading,
    error:
      playlistQuery.error ||
      musicsQuery.error ||
      albumQuery.error ||
      recommendationQuery.error,
  };
}
