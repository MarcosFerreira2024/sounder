import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useTooltip } from "../../contexts/TooltipContext";
import Image from "../ui/Image";
import type { Playlist } from "../../hooks/usePlaylist";

type PlaylistCarouselProps = {
  loading?: boolean;

  data: {
    playlists: Playlist[];
    scrollAmount: number;
    scrollLeft: () => void;
    scrollRight: () => void;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
    containerSize: number;
    updateScrollButtons: () => void;
    itemSize: number;
    visibleItems: number;
    gap: number;
  };
};

function PlaylistCarousel({ data, loading }: PlaylistCarouselProps) {
  const navigate = useNavigate();
  const { playlistId } = useParams();

  const { hideTooltip, showTooltip } = useTooltip();

  const {
    playlists,
    containerRef,
    containerSize,
    scrollLeft,
    scrollRight,
    updateScrollButtons,
    gap,
    itemSize,
    canScrollLeft,
    canScrollRight,
    visibleItems,
  } = data;

  if (loading) return null;

  if (playlists)
    return (
      <div className="flex items-center gap-2 lg:static lg:translate-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {playlists.length > visibleItems && (
          <ChevronLeft
            className={`${!canScrollLeft && "opacity-50"} text-neutral-200`}
            onClick={() => scrollLeft()}
          />
        )}
        <div
          ref={containerRef}
          onScroll={updateScrollButtons}
          style={{
            gap,
            maxWidth: containerSize,
          }}
          className="flex items-center overflow-x-auto scrollbar-hide"
        >
          {playlists.map((item, index) => {
            const active = item.id === playlistId;

            return (
              <button
                onMouseLeave={hideTooltip}
                onMouseMove={(e) => showTooltip(e, item.name)}
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className=" bg-neutral-900 rounded-lg "
              >
                <Image
                  style={{
                    minWidth: itemSize,
                    minHeight: itemSize,
                    maxHeight: itemSize,
                    maxWidth: itemSize,
                  }}
                  src={item.image ?? "/not-found.svg"}
                  data-active={active}
                  className={`${active ? " border-neutral-700  grayscale-50" : " border-neutral-800"} border overflow-hidden   object-cover rounded-lg  `}
                />
              </button>
            );
          })}
        </div>
        {playlists.length > visibleItems && (
          <ChevronRight
            className={`${!canScrollRight && "opacity-50"} text-neutral-200`}
            onClick={() => scrollRight()}
          />
        )}
      </div>
    );
}

export default PlaylistCarousel;
