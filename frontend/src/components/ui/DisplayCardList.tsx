import { DisplayCard, type DisplayCardProps } from "./DisplayCard";
import { DisplayCardSkeleton } from "./DisplayCardSkeleton";

type DisplayCardListProps = {
  data: DisplayCardProps[];
  loading?: boolean;
};

function DisplayCardList({ data, loading }: DisplayCardListProps) {
  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <DisplayCardSkeleton key={i} />
        ))}
      </>
    );
  }

  return data.map((card, i) => (
    <DisplayCard key={card.title ?? +i} {...card} />
  ));
}

export default DisplayCardList;
