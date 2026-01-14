import UserConnectionsList from "../components/UserConnectionsList";
import { followingMock } from "../data/followingMock";

function Following() {
  return <UserConnectionsList data={followingMock} />;
}

export default Following;
