import { MediaCard, type MediaCardProps } from "./MediaCard";

type MediaCardListProps = {
  data: MediaCardProps[];
  className?: string;
};

function MediaCardList({ data, className }: MediaCardListProps) {
  return data.map((mediaCard) => (
    <MediaCard className={className} {...mediaCard} />
  ));
}

export default MediaCardList;
