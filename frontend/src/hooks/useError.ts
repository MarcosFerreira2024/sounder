import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";

function useError() {
  const [error, setErrorState] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  const errorCleanupTimeout = 2000; // 2s

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimeoutRef() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {

    clearTimeoutRef();

    if (!isHovering && error) {
      timeoutRef.current = setTimeout(() => {
        clearError();
      }, errorCleanupTimeout);
    }

    return clearTimeoutRef;
  }, [isHovering, error]);

  function setError(message: string) {
    if(message === error) {
      return
    }
    clearTimeoutRef();
    if (error) {
      clearError();

      timeoutRef.current = setTimeout(() => {
        setErrorState(message);
      }, 1000);

      return;
    }

    setErrorState(message);
  }

  function clearError() {
    clearTimeoutRef();
    setErrorState("");
  }

  function handleAppErrors(err:any) {
    if (err instanceof ZodError) {
        setError(err.issues[0].message);
        return;
    }

      if (err instanceof Error) {
        setError(err.message);
        return;
      }

      setError("Erro inesperado");
  }

  return {
    error,
    setError,
    clearError,
    setIsHovering,
    handleAppErrors,
  };
}

export { useError };
