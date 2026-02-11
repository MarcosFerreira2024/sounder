import { useNavigate, useParams } from "react-router-dom";
import UserConnectionsList from "../components/UserConnectionsList";
import { useFollow } from "../hooks/useFollow";

function Following() {
  const { userId } = useParams();
  const { following } = useFollow(userId);
  const navigate = useNavigate();

  const data =
    following?.map((following) => ({
      ...following,
      onClick: () => navigate(`/profile/${following.id}`),
    })) ?? null;

  return <UserConnectionsList data={data} />;
}

export default Following;
