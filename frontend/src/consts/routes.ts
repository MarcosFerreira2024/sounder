import addToPlaylist from "../actions/music/removeFromPlaylist";
import type { QueryType } from "../hooks/useSearch";

export const BACKEND_API_URL = "http://localhost:3000/api";

export const routes = {
  playlist: {
    getPlaylistById(id: string) {
      return `${BACKEND_API_URL}/playlist/${id}`;
    },

    createPlaylist: `${BACKEND_API_URL}/playlist`,

    getUserPlaylists(userId?: string) {
      return `${BACKEND_API_URL}/playlists${userId ? `?userId=${userId}` : ""}`;
    },
    updatePlaylist(playlistId: string) {
      return `${BACKEND_API_URL}/playlist/${playlistId}`;
    },
    deletePlaylist(playlistId: string) {
      return `${BACKEND_API_URL}/playlist/${playlistId}`;
    },
  },
  album: {
    getAlbumById(albumId: string) {
      return `${BACKEND_API_URL}/albums/${albumId}`;
    },
    getMusicsByAlbumId(albumId: string) {
      return `${BACKEND_API_URL}/albums/${albumId}/musics`;
    },
  },
  search: {
    searchByQuery(query: string, type: QueryType) {
      return `${BACKEND_API_URL}/search?q=${query}&type=${type}`;
    },
  },

  follow: {
    getFollowingsById(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/following`;
    },

    getFollowCount(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/follow-count`;
    },
    getFollowersById(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/followers`;
    },
    follow(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/follow`;
    },
    unfollow(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/unfollow`;
    },
    isFollowingUser(userId: string) {
      return `${BACKEND_API_URL}/user/${userId}/is-following`;
    },
  },

  music: {
    getMusicsByPlaylistId(playlistId: string) {
      return `${BACKEND_API_URL}/playlist/${playlistId}/musics`;
    },
    getById(musicId: string) {
      return `${BACKEND_API_URL}/music/${musicId}`;
    },
    like(musicId: string) {
      return `${BACKEND_API_URL}/music/${musicId}/like`;
    },
    removeFromPlaylist(musicId: string, playlistId: string) {
      return `${BACKEND_API_URL}/playlist/${playlistId}/music/${musicId}`;
    },
    dislike(musicId: string) {
      return `${BACKEND_API_URL}/music/${musicId}/dislike`;
    },

    addToPlaylist(musicId: string, playlistId: string) {
      return `${BACKEND_API_URL}/playlist/${playlistId}/music/${musicId}`;
    },
  },

  user: {
    getUserInfo(userId?: string | null) {
      return `${BACKEND_API_URL}/user${userId ? `?userId=${userId}` : ""}`;
    },
    updateUser() {
      return `${BACKEND_API_URL}/user`;
    },
    updateProfilePicture: `${BACKEND_API_URL}/user/profile-picture`,
  },
  artist: {
    getArtists(query?: string) {
      return `${BACKEND_API_URL}/artists${query ? `?${query}` : ""}`;
    },
  },

  game: {
    answer(mode: string) {
      return `${BACKEND_API_URL}/game/answer?mode=${mode}`;
    },
    state(mode: string) {
      return `${BACKEND_API_URL}/game/state?mode=${mode}`;
    },
    start(mode: string) {
      return `${BACKEND_API_URL}/game/start?mode=${mode}`;
    },
    stats(mode: string) {
      return `${BACKEND_API_URL}/game/user-stats?mode=${mode}`;
    },
    daily: `${BACKEND_API_URL}/game/daily-game`,
    modes: `${BACKEND_API_URL}/game/modes`,
  },
};
