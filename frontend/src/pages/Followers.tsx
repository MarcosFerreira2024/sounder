import { useNavigate, useParams } from "react-router-dom";
import UserConnectionsList, {
  type UserConnectionsListProps,
} from "../components/UserConnectionsList";
import { useFollow } from "../hooks/useFollow";

function Followers() {
  const { userId } = useParams();
  const { followers } = useFollow(userId);

  const navigate = useNavigate();

  const data =
    followers?.map((follower) => ({
      ...follower,
      onClick: () => navigate(`/profile/${follower.id}`),
    })) ?? null;

  return <UserConnectionsList data={data} />;
}

export default Followers;
