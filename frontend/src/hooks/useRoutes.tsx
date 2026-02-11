import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Playlist from "../pages/Playlist";
import Teste from "../pages/Teste";
import { Profile } from "../pages/Profile";
import Followers from "../pages/Followers";
import Login from "../pages/Login";
import Following from "../pages/Following";
import AuthCallback from "../pages/AuthCallback";
import type { JSX } from "react";
import { AudioProvider } from "../contexts/AudioContext";
import { PlaylistProvider } from "../contexts/PlaylistContext";
import { useParams } from "react-router-dom";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";
import UserPlaylists from "../pages/UserPlaylists";

type AppRoute = {
  path: string;
  element: JSX.Element;
  guard?: "auth" | "guest" | "public";
};

function useRoutes() {
  const routes: AppRoute[] = [
    {
      path: "/",
      element: (
        <AudioProvider>
          <Home />
        </AudioProvider>
      ),
      guard: "auth",
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/playlist/:playlistId",
      element: <PlaylistRoute />,
      guard: "auth",
    },
    {
      path: "/profile/:userId",
      element: <Profile />,
      guard: "auth",
    },
    {
      path: "/profile/:userId/playlists",
      element: <UserPlaylists />,
      guard: "auth",
    },
    {
      path: "/profile/:userId/followers",
      element: <Followers />,
      guard: "auth",
    },

    {
      path: "/profile/:userId/following",
      element: <Following />,
      guard: "auth",
    },
    {
      path: "/profile/:userId/playlist/:playlistId",
      element: <PlaylistRoute />,
      guard: "auth",
    },

    {
      path: "/teste",
      element: <Teste />,
      guard: "guest",
    },
    {
      path: "/login",
      element: <Login />,
      guard: "guest",
    },
    {
      path: "/signup",
      element: <Signup />,
      guard: "guest",
    },
    {
      path: "/auth/callback",
      element: <AuthCallback />,
      guard: "guest",
    },
    {
      path: "*",
      element: <NotFound />,
      guard: "public",
    },
  ];

  return { routes };
}

export default useRoutes;

export function PlaylistRoute() {
  const { playlistId } = useParams<{ playlistId: string }>();

  return (
    <PlaylistProvider playlistId={playlistId}>
      <AudioProvider>
        <Playlist />
      </AudioProvider>
    </PlaylistProvider>
  );
}
