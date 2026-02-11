import { createContext, useContext } from "react";
import { useError } from "../hooks/useError";
import AppError from "../components/ui/AppError";
import { AnimatePresence } from "framer-motion";

type AppErrorContextType = ReturnType<typeof useError>;

const AppErrorContext = createContext<AppErrorContextType | null>(null);

type AppErrorProviderProps = {
  children: React.ReactNode;
};

export function AppErrorProvider({ children }: AppErrorProviderProps) {
  const { clearError, error, setError, setIsHovering, handleAppErrors } =
    useError();

  return (
    <AppErrorContext.Provider
      value={{
        clearError,
        error,
        handleAppErrors,
        setError,
        setIsHovering,
      }}
    >
      {children}

      <AnimatePresence>
        {error && (
          <AppError
            setIsHovering={setIsHovering}
            message={error}
            onClose={clearError}
          />
        )}
      </AnimatePresence>
    </AppErrorContext.Provider>
  );
}

export function useAppError() {
  const context = useContext(AppErrorContext);

  if (!context) {
    throw new Error("useAppError must be used within an AppErrorProvider");
  }

  return context;
}
