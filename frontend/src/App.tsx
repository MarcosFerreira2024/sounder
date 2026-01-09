import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomTooltipWrapper from "./components/CustomTooltipWrapper";
import Playlist from "./pages/Playlist";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
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
  ];

  return (
    <>
      <BrowserRouter>
        <CustomTooltipWrapper />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
