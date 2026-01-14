import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Playlist from "../pages/Playlist";
import Teste from "../pages/Teste";
import { Profile } from "../pages/Profile";
import Followers from "../pages/Followers";
import Login from "../pages/Login";
import Following from "../pages/Following";
function useRoutes() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/teste",
      element: <Teste />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/playlist",
      element: <Playlist />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    {
      path: "/profile/:id/followers",
      element: <Followers />,
    },
    {
      path: "/profile/:id/following",
      element: <Following />,
    },
    {
      path: "/profile/:id/playlist/:id",
      element: <Playlist />,
    },
  ];

  return {
    routes,
  };
}

export default useRoutes;
