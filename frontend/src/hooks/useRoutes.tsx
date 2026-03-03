import React from "react";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Playlist from "../pages/Playlist";
import Teste from "../pages/Teste";
import { Profile } from "../pages/Profile";
import Followers from "../pages/Followers";
import Login from "../pages/Login";
import Following from "../pages/Following";
import AuthCallback from "../pages/AuthCallback";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";
import UserPlaylists from "../pages/UserPlaylists";
import Album from "../pages/Album";
import DailyGame from "../pages/DailyGame";
import Music from "../pages/Music";

type AppRoute = {
  path: string;
  Component: React.ComponentType;
  guard?: "auth" | "guest" | "public";
};

const routes: AppRoute[] = [
  {
    path: "/",
    Component: Home,
    guard: "auth",
  },
  {
    path: "/search",
    Component: Search,
  },
  {
    path: "/music/:musicId",
    Component: Music,
  },
  {
    path: "/playlist/:playlistId",
    Component: Playlist,
    guard: "auth",
  },
  {
    path: "/daily-game",
    Component: DailyGame,
    guard: "auth",
  },
  {
    path: "/profile",
    Component: Profile,
    guard: "auth",
  },

  {
    path: "/profile/:userId",
    Component: Profile,
    guard: "auth",
  },
  {
    path: "/album/:albumId",
    Component: Album,
    guard: "auth",
  },
  {
    path: "/profile/:userId/playlists",
    Component: UserPlaylists,
    guard: "auth",
  },

  {
    path: "/profile/:userId/followers",
    Component: Followers,
    guard: "auth",
  },

  {
    path: "/profile/:userId/following",
    Component: Following,
    guard: "auth",
  },
  {
    path: "/profile/:userId/playlist/:playlistId",
    Component: Playlist,
    guard: "auth",
  },

  {
    path: "/teste",
    Component: Teste,
    guard: "public",
  },
  {
    path: "/login",
    Component: Login,
    guard: "guest",
  },
  {
    path: "/signup",
    Component: Signup,
    guard: "guest",
  },
  {
    path: "/auth/callback",
    Component: AuthCallback,
    guard: "public",
  },
  {
    path: "*",
    Component: NotFound,
    guard: "public",
  },
];

function useRoutes() {
  return { routes };
}

export default useRoutes;
