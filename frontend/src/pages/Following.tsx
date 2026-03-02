import { useParams } from "react-router-dom";
import UserConnectionsList from "../components/UserConnectionsList";
import { useFollow } from "../hooks/useFollow";

function Following() {
  const { userId } = useParams();
  const { following } = useFollow(userId);

  const data =
    following?.map((following) => ({
      ...following,
      to: `/profile/${following.id}`,
      title: following.name,
      imageClassName: "min-w-70  rounded-full min-h-70 max-w-70 max-h-70 ",
    })) ?? null;

  return <UserConnectionsList data={data} />;
}

export default Following;
