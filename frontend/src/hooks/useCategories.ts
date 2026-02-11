import { useEffect, useRef, useState } from "react";
import { usePlaylist } from "./usePlaylist";
import { useUser } from "./useUser";
import { useUserPlaylists } from "./useUserPlaylists";
import { authClient } from "../libs/auth/auth";

function useCategories() {
  const userId = authClient.useSession().data?.user.id || "";
  const { playlists: userPlaylists } = useUserPlaylists(userId);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const visibleItems = 4;
  const itemSize = 56;
  const gap = 40;

  const scrollAmount = itemSize + gap;
  const containerSize = itemSize * visibleItems + gap * (visibleItems - 1);

  const updateScrollButtons = () => {
    const el = containerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  return {
    scrollAmount,
    scrollLeft,
    scrollRight,
    canScrollLeft,
    canScrollRight,
    categories: userPlaylists,
    containerRef,
    containerSize,
    updateScrollButtons,
    itemSize,
    gap,
  };
}

export default useCategories;
