import UserConnectionsList from "../components/UserConnectionsList";
import { followersMock } from "../data/followersMock";

function Followers() {
  return <UserConnectionsList data={followersMock} />;
}

export default Followers;
