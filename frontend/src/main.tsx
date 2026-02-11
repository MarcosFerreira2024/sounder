import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Tooltip from "./components/ui/Tooltip.tsx";
import { TooltipProvider } from "./contexts/TooltipContext.tsx";
import { AppErrorProvider } from "./contexts/ErrorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorProvider>
      <TooltipProvider>
        <Tooltip />
        <App />
      </TooltipProvider>
    </AppErrorProvider>
  </StrictMode>,
);
