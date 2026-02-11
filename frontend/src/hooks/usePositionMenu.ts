import React, { useState } from "react";
import useVisibility from "./useVisibility";

function usePositionMenu() {
  const { isVisible, close, open } = useVisibility(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggle = (e: React.MouseEvent) => {
    if (isVisible) return close();
    else return openMenu(e);
  };

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    let x = e.clientX;
    let y = e.clientY;

    if (x + 200 >= window.innerWidth) x = window.innerWidth - 300;

    if (y + 200 >= window.innerHeight) y = window.innerHeight - 100;

    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;

    setPosition({ x: Math.abs(xPercent), y: Math.abs(yPercent) });
    open();
  };

  return {
    openMenu,
    toggle,
    isVisible,
    close,

    position,
  };
}

export default usePositionMenu;
