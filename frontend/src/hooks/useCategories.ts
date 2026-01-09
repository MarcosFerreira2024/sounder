import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function useCategories() {
  const categories = [
    {
      name: "teste1",
      photo: "artist-mock-photo.jpeg",
      to: "/playlist/teste1",
    },
    {
      name: "teste2",
      photo: "music-cover-mock.png",
      to: "/playlist/teste2",
    },
    {
      name: "teste3",
      photo: "artist-mock-photo.jpeg",
      to: "/playlist/teste3",
    },
    {
      name: "teste3",
      photo: "artist-mock-photo.jpeg",
      to: "/playlist/teste3",
    },
    {
      name: "teste3",
      photo: "artist-mock-photo.jpeg",
      to: "/playlist/teste3",
    },
  ];
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
    categories,
    containerRef,
    containerSize,
    updateScrollButtons,
    itemSize,
    gap


  }
}

export default useCategories