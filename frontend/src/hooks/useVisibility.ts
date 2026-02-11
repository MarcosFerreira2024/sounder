import { useEffect, useState } from "react";

function useVisibility(initialState: boolean) {
  const [isVisible, setVisibility] = useState(initialState);

  const toggle = () => {
    setVisibility(!isVisible);
  };

  const open = () => {
    setVisibility(true);
  };

  const close = () => {
    setVisibility(false);
  };

  const handleKeyboardClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  useEffect(() => {
    window.addEventListener("click", close);

    window.addEventListener("keydown", handleKeyboardClose);

    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", handleKeyboardClose);
    };
  }, []);

  return {
    toggle,
    close,
    open,
    isVisible,
  };
}

export default useVisibility;
