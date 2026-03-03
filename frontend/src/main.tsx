import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Tooltip from "./components/ui/Tooltip.tsx";
import { TooltipProvider } from "./contexts/TooltipContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppNotificationsProvider } from "./contexts/NotificationsContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppNotificationsProvider>
        <TooltipProvider>
          <Tooltip />
          <App />
        </TooltipProvider>
      </AppNotificationsProvider>
    </AuthProvider>
  </QueryClientProvider>,
);
