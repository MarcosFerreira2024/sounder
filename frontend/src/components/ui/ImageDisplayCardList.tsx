import {
  ImageDisplayCard,
  type ImageDisplayCardProps,
} from "./ImageDisplayCard";

type ImageDisplayCardListProps = {
  data?: ImageDisplayCardProps[];
  className: string;
};

function ImageDisplayCardList({ data, className }: ImageDisplayCardListProps) {
  return data?.map((cardData: ImageDisplayCardProps) => (
    <ImageDisplayCard {...cardData} className={className} />
  ));
}

export default ImageDisplayCardList;
