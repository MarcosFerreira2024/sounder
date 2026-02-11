import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomTooltipWrapper from "./components/ui/CustomTooltipWrapper";
import useRoutes from "./hooks/useRoutes";
import routeGuard from "./helpers/routeGuard";

function App() {
  const { routes } = useRoutes();
  return (
    <>
      <BrowserRouter>
        <CustomTooltipWrapper />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={routeGuard(route.element, route.guard)}
              path={route.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
