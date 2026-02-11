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
  },

  user: {
    getUserInfo(userId?: string) {
      return `${BACKEND_API_URL}/user${userId ? `?userId=${userId}` : ""}`;
    },
    updateUser() {
      return `${BACKEND_API_URL}/user`;
    },
    updateProfilePicture: `${BACKEND_API_URL}/user/profile-picture`,
  },
};
