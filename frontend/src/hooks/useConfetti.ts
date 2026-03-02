import confetti from "@hiseb/confetti";
import { useCallback } from "react";

function useConfetti() {
  const triggerConfetti = useCallback(() => {
    const positionList = [
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6 },
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.2 },

      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },

      { x: window.innerWidth * 0.6, y: window.innerHeight * 0.5 },
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 },
    ];
    for (let i = 0; i < positionList.length; i++) {
      setTimeout(() => confetti({ position: positionList[i] }), i * 350);
    }
  }, []);

  return {
    triggerConfetti,
  };
}
export default useConfetti;
