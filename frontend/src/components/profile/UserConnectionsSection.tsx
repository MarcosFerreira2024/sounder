import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ProfileDisplayCardList } from "./ProfileDisplayCardList";

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

  const navigate = useNavigate();

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h1
          className="text-main text-2xl"
          onClick={() => navigate(`/profile/${userId}/${type}`)}
        >
          {type === "followers" ? "Seguidores" : "Seguindo"}:
        </h1>
      </div>
      {isLoading ||
        (!data && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => {
              return (
                <div
                  key={index}
                  aria-hidden
                  className="h-[200px] min-h-[200px]  min-w-[200px] bg-neutral-900/80 rounded-2xl animate-pulse"
                />
              );
            })}
          </div>
        ))}
      <ProfileDisplayCardList isLoading={isLoading} profiles={data} />
    </div>
  );
}
