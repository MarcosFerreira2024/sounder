import React from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ContentSection({
  title,
  children,
  containerRef,
  scrollOptions = true,
  scrollState,
  scrollLeft,
  scrollRight,
  hasItems,
  to,
}: {
  title: string;
  to?: string;
  containerRef: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  scrollOptions?: boolean;
  hasItems?: boolean;
  loading: boolean;
  scrollState?: {
    canScrollLeft: boolean;
    canScrollRight: boolean;
  };
  scrollLeft?: () => void;
  scrollRight?: () => void;
}) {
  const navigate = useNavigate();

  if (hasItems === false) {
    return;
  }

  return (
    <section className="flex gap-2 flex-col">
      <div className="flex items-center justify-between">
        <h1
          onClick={() => to && navigate(to)}
          className="text-main text-2xl cursor-pointer"
        >
          {title}:
        </h1>

        {scrollOptions && (
          <div className="flex gap-2">
            <Button
              size="sm"
              roundedValue="sm"
              icon={<ChevronLeft />}
              disabled={!scrollState?.canScrollLeft}
              onClick={scrollLeft}
            />
            <Button
              size="sm"
              roundedValue="sm"
              icon={<ChevronRight />}
              disabled={!scrollState?.canScrollRight}
              onClick={scrollRight}
            />
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto py-2
        scrollbar-hide snap-x snap-mandatory"
      >
        {children}
      </div>
    </section>
  );
}

export default ContentSection;
