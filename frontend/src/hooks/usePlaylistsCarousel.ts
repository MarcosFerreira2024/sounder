import { useEffect, useRef, useState } from "react";
import { useUserPlaylists } from "./useUserPlaylists";
import { authClient } from "../libs/auth/auth";
import useBreakpoint from "./useBreakpoint";

function usePlaylistsCarousel() {
  const userId = authClient.useSession().data?.user.id || "";
  const { playlists: userPlaylists, loading } = useUserPlaylists(userId);

  const isMobile = useBreakpoint();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const visibleItems = isMobile ? 1 : 3;
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
  }, [userPlaylists]);

  useEffect(() => {
    if (!containerRef.current) return;

    const activeItem =
      containerRef.current.querySelector<HTMLButtonElement>(
        "[data-active=true]",
      );
    if (activeItem) {
      activeItem.scrollIntoView({
        inline: "start",
      });
    }
  }, [userPlaylists]);

  return {
    scrollAmount,
    scrollLeft,
    scrollRight,
    canScrollLeft,
    canScrollRight,
    playlists: userPlaylists,
    containerRef,
    containerSize,
    updateScrollButtons,
    itemSize,
    loading,
    visibleItems,
    gap,
  };
}

export default usePlaylistsCarousel;
