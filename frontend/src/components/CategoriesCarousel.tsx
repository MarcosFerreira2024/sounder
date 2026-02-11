import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTooltip } from "../contexts/TooltipContext";
import useCategories from "../hooks/useCategories";

function CategoriesCarousel() {
  const {
    canScrollLeft,
    canScrollRight,
    categories,
    containerRef,
    containerSize,
    scrollLeft,
    scrollRight,
    updateScrollButtons,
    gap,
    itemSize,
  } = useCategories();

  const navigate = useNavigate();

  const { hideTooltip, showTooltip } = useTooltip();

  if (categories)
    return (
      <div className="flex items-center gap-2">
        {categories.length > 4 && (
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
          {categories.map((item, index) => (
            <button
              onMouseLeave={hideTooltip}
              onMouseMove={(e) => showTooltip(e, item.name)}
              onClick={() => navigate(`/playlist/${item.id}`)}
              key={index}
              className=" bg-neutral-700 rounded-lg "
            >
              <img
                style={{
                  minWidth: itemSize,
                  minHeight: itemSize,
                  maxHeight: itemSize,
                  maxWidth: itemSize,
                }}
                src={item.image}
                className="   object-cover rounded-lg border border-neutral-900"
              />
            </button>
          ))}
        </div>
        {categories.length > 4 && (
          <ChevronRight
            className={`${!canScrollRight && "opacity-50"} text-neutral-200`}
            onClick={() => scrollRight()}
          />
        )}
      </div>
    );
}

export default CategoriesCarousel;
