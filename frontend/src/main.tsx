import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Tooltip from "./components/Tooltip.tsx";
import { TooltipProvider } from "./contexts/TooltipContext.tsx";
import { AnimatePresence } from "framer-motion";
import { GoogleOAuthProvider } from "@react-oauth/google";

// não sao perigosos de aparecer no repo ...
export const GOOGLE_CLIENT_ID =
  "1010171561666-t2q045q5d4hv0qj6nlm688phptesvte6.apps.googleusercontent.com";

export const GITHUB_CLIENT_ID = "Ov23liqgHfsn806m6IO5";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <TooltipProvider>
        <AnimatePresence>
          <Tooltip />
        </AnimatePresence>
        <App />
      </TooltipProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
