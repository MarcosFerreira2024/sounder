import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import { ProfileDisplayCardList } from "./ProfileDisplayCardList";

interface UserConnectionsSectionProps {
  data: { id: string; name: string; image: string }[];
  type: "following" | "followers";
}

export function UserConnectionsSection({
  data,
  type,
}: UserConnectionsSectionProps) {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h1 className="text-main text-2xl">
          {type === "followers" ? "Seguidores" : "Seguindo"}:
        </h1>
        {data.length > 5 && (
          <Button
            onClick={() => navigate(`/profile/${id}/${type}`)}
            className="text-opacity"
            size="xs"
            roundedValue="sm"
          >
            Ver mais
          </Button>
        )}
      </div>
      <ProfileDisplayCardList profiles={data} />
    </div>
  );
}
