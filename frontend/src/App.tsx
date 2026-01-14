import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomTooltipWrapper from "./components/ui/CustomTooltipWrapper";
import useRoutes from "./hooks/useRoutes";

function App() {
  const { routes } = useRoutes();
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
