import { useParams } from "react-router-dom";
import CarouselSection from "../ui/CarouselSection";
import DisplayCardList from "../ui/DisplayCardList";

interface UserConnectionsSectionProps {
  data: { id: string; name: string; image: string }[] | null;
  type: "following" | "followers";
  isLoading: boolean;
}

export function UserConnectionsSection({
  data,
  type,
  isLoading,
}: UserConnectionsSectionProps) {
  const { userId } = useParams();

  return (
    <CarouselSection
      loading={isLoading}
      to={`/profile/${userId}/${type}`}
      title={type === "following" ? "Seguindo" : "Seguidores"}
      items={data}
      mapItem={(follow) => ({
        image: follow.image,
        title: follow.name,
        to: `/profile/${follow.id}`,
        imageClassName:
          " lg:min-h-[200px] lg:min-w-[200px] lg:max-w-[200px] lg:max-h-[200px] min-h-[150px] min-w-[150px] max-w-[150px] max-h-[150px]",
        grayScale: true,
        className: "rounded-2xl h-fit",
      })}
      renderList={(mappedItems) => <DisplayCardList data={mappedItems} />}
    />
  );
}
