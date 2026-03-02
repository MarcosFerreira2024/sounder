import { useParams } from "react-router-dom";
import UserConnectionsList from "../components/UserConnectionsList";
import { useFollow } from "../hooks/useFollow";

function Followers() {
  const { userId } = useParams();
  const { followers } = useFollow(userId);

  const data =
    followers?.map((follower) => ({
      ...follower,
      to: `/profile/${follower.id}`,
      title: follower.name,
      imageClassName: "min-w-70  rounded-full min-h-70 max-w-70 max-h-70 ",
    })) ?? null;

  return <UserConnectionsList data={data} />;
}

export default Followers;
