import { useMutation, useQueryClient } from "@tanstack/react-query";
import likeMusic from "../actions/music/like";
import dislikeMusic from "../actions/music/dislike";
import addToPlaylist from "../actions/music/addToPlaylist";
import removeFromPlaylist from "../actions/music/removeFromPlaylist";
import { useUserPlaylists } from "./useUserPlaylists";
import { useState } from "react";
import { authClient } from "../libs/auth/auth";
import { useAppNotifications } from "../contexts/NotificationsContext";
import useVisibility from "./useVisibility";
import { useAudioContext } from "../contexts/AudioContext";

function useMusicActions() {
  const { nextSong } = useAudioContext();
  const queryClient = useQueryClient();

  const { handleAppNotificationsError, setNotification } =
    useAppNotifications();

  const id = authClient.useSession().data?.user.id || "";
  const { playlists, loading: loadingPlaylists } = useUserPlaylists(id);
  const [selected, setSelected] = useState<string[]>([]);
  const { close, isVisible, open, toggle } = useVisibility(false);
  const [canSelect, setCanSelect] = useState(true);

  const handleSelection = (id: string) => {
    if (!canSelect) return;
    const alreadySelected = selected.includes(id);

    if (alreadySelected) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleLike = async (musicId: string) => {
    likeMutation.mutate(musicId);
  };

  const handleDislike = async (musicId: string) => {
    dislikeMutation.mutate(musicId);
  };

  const handleAddMusicToPlaylist = async (musicId: string) => {
    if (selected.length === 0) return;

    setCanSelect(false);
    for (let i = 0; i < selected.length; i++) {
      if (canSelect) {
        addMusicToPlaylistMutation.mutate({ musicId, playlistId: selected[i] });
      }
    }
    setCanSelect(true);

    close();
  };

  const handleCloseModal = (musicId: string) => {
    if (selected.length === 0) {
      handleLike(musicId);
    }
    close();
  };

  const likeMutation = useMutation({
    mutationFn: async (musicId: string) => {
      setNotification("Curtindo...");
      const response = await likeMusic(musicId);
      setNotification("Curtido com sucesso");
      return response;
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async (musicId: string) => {
      setNotification("Descurtindo...");
      const response = await dislikeMusic(musicId);
      setNotification("Descurtido com sucesso");
      nextSong();
      return response;
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  const addMusicToPlaylistMutation = useMutation({
    mutationFn: async ({
      musicId,
      playlistId,
    }: {
      musicId: string;
      playlistId: string;
    }) => {
      setNotification("Adicionando...");
      const response = await addToPlaylist(musicId, playlistId);
      setNotification("Adicionado com sucesso");
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["musics", variables.playlistId],
      });
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  const removeMusicFromPlaylistMutation = useMutation({
    mutationFn: async ({
      musicId,
      playlistId,
    }: {
      musicId: string;
      playlistId: string;
    }) => {
      setNotification("Removendo...");
      const response = await removeFromPlaylist(musicId, playlistId);
      setNotification("Removido com sucesso");
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["musics", variables.playlistId],
      });
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  return {
    selected,
    open,
    isVisible,

    handleSelection,
    handleLike,
    handleDislike,
    handleAddMusicToPlaylist,
    playlists,
    handleCloseModal,
    loadingPlaylists,
  };
}

export default useMusicActions;
