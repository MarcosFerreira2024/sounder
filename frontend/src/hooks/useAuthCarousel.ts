import { useEffect, useState } from "react";

function useAuthCarousel(isTyping: boolean) {
  const images = [
    { alt: "Tyler The Creator, Flower Boy", src: "auth/flower-boy.webp" },
    { alt: "SZA, SOS", src: "auth/sza-sos.webp" },
    { alt: "The Weekend, After Hours", src: "auth/after-hours.webp" },
  ];
  const minIndex = 0;
  const maxIndex = images.length - 1;
  const interval = 3000; // 3s

  type scrollPreference = "paused" | "running";

  const [currentIndex, setCurrentIndex] = useState(minIndex);
  const [autoScrollPreference, setAutoScrollPreference] =
    useState<scrollPreference>(() => {
      const savedPreference = localStorage.getItem(
        "autoScrollPreference",
      ) as scrollPreference;
      return savedPreference || "running";
    });

  useEffect(() => {
    localStorage.setItem("autoScrollPreference", autoScrollPreference);
  }, [autoScrollPreference]);

  const [isHovering, setIsHovering] = useState(false);

  const handleScrollPreference = () => {
    if (autoScrollPreference === "running")
      return setAutoScrollPreference("paused");
    else return setAutoScrollPreference("running");
  };

  useEffect(() => {
    if (isHovering) return;
    if (isTyping) return;
    if (autoScrollPreference === "paused") return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? minIndex : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [isHovering]);

  return {
    images,
    isHovering,
    isTyping,
    handleScrollPreference,
    setIsHovering,
    currentIndex,
    minIndex,
    maxIndex,
    autoScrollPreference,
    setCurrentIndex,
  };
}

export default useAuthCarousel;
