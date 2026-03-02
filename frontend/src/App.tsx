import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoaderProvider } from "./contexts/LoaderContext";
import { AudioProvider } from "./contexts/AudioContext";
import AudioRouteHandler from "./components/AudioRouteHandler";

import CustomTooltipWrapper from "./components/ui/CustomTooltipWrapper";
import useRoutes from "./hooks/useRoutes";
import routeGuard from "./helpers/routeGuard";

function App() {
  const { routes } = useRoutes();

  return (
    <LoaderProvider>
      <AudioProvider>
        <BrowserRouter>
          <CustomTooltipWrapper />
          <AudioRouteHandler />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                element={routeGuard(route.Component, route.guard)}
                path={route.path}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </LoaderProvider>
  );
}

export default App;
