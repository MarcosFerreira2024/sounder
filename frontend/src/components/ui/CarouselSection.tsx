import { useRef } from "react";
import useCarousel from "../../hooks/useCarousel";
import ContentSection from "./ContentSection";

type CarouselSectionProps<T, MappedItem> = {
  title: string;
  items?: T[] | null;
  mapItem: (item: T) => MappedItem;
  renderList: (data: MappedItem[]) => React.ReactNode;
  loading: boolean;
  to?: string;
};

function CarouselSection<T, MappedItem>({
  title,
  items,
  mapItem,
  loading,
  to,
  renderList,
}: CarouselSectionProps<T, MappedItem>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mappedItems = items ? items.map(mapItem) : [];

  const { scrollState, scrollLeft, scrollRight } = useCarousel(
    containerRef,
    undefined,
    mappedItems.length,
  );

  return (
    <ContentSection
      loading={loading}
      hasItems={mappedItems.length > 0}
      key={title}
      title={title}
      scrollOptions={true}
      containerRef={containerRef}
      scrollState={scrollState}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
      to={to}
    >
      {loading ||
        !items ||
        (!mappedItems && (
          <div className="text-2xl text-opacity">Carregando</div>
        ))}
      {renderList(mappedItems)}
    </ContentSection>
  );
}

export default CarouselSection;
