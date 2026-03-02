import React, { useCallback, useLayoutEffect, useState } from "react";

function useCarousel(
  containerRef: React.RefObject<HTMLDivElement | null>,
  gap: number = 16,
  itemsCount: number = 0,
) {
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const getScrollAmount = (): number => {
    const container = containerRef.current;
    if (!container) return 0;

    const firstChild = container.firstElementChild as HTMLElement | null;
    return firstChild ? firstChild.offsetWidth + gap : container.clientWidth;
  };

  const scrollLeft = (): void => {
    const container = containerRef.current;
    if (!container || !scrollState.canScrollLeft) return;

    container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  };

  const scrollRight = (): void => {
    const container = containerRef.current;
    if (!container || !scrollState.canScrollRight) return;

    container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  };

  const updateScrollButtons = useCallback(() => {
    const element = containerRef.current;
    if (!element) return;

    const canScrollLeft = element.scrollLeft > 0;
    const canScrollRight =
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1;

    setScrollState({ canScrollLeft, canScrollRight });
  }, [containerRef]);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    updateScrollButtons();
    requestAnimationFrame(updateScrollButtons);

    const handleScroll = () => updateScrollButtons();
    element.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(updateScrollButtons),
    );
    resizeObserver.observe(element);

    const mutationObserver = new MutationObserver(() =>
      requestAnimationFrame(updateScrollButtons),
    );
    mutationObserver.observe(element, { childList: true, subtree: true });

    const timeoutId = setTimeout(() => {
      updateScrollButtons();
    }, 50);

    return () => {
      element.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [updateScrollButtons, itemsCount, containerRef]);

  return { scrollLeft, scrollRight, scrollState };
}

export default useCarousel;
