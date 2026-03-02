import Button from "./Button";
import { Gamepad2, Home, LogOut, Plus } from "lucide-react";
import CategoriesCarousel from "../playlist/PlaylistCarousel";
import useVisibility from "../../hooks/useVisibility";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AddModal from "../collection/AddModal";
import { SidebarSkeleton } from "./SidebarSkeleton";
import usePlaylistsCarousel from "../../hooks/usePlaylistsCarousel";

function Sidebar({ loading }: { loading?: boolean }) {
  const { close, isVisible, open } = useVisibility(false);
  const { handleSignOut } = useAuth();
  const navigate = useNavigate();

  const data = usePlaylistsCarousel();

  if (data.loading || loading) return <SidebarSkeleton />;

  return (
    <div className="w-full h-full  p-1 lg:p-2 mt-2 min-h-[94px] flex relative   bg-neutral-900 border border-neutral-800 rounded-2xl">
      <nav className="flex flex-1  justify-between  items-center lg:px-4 px-2  rounded-2xl   bg-neutral-950 border-neutral-900">
        <div className="flex items-center  lg:gap-4 gap-3 ">
          <Button
            onClick={handleSignOut}
            roundedValue="full"
            size="md"
            icon={<LogOut />}
            title="Add"
          />
          <Button
            onClick={() => navigate("/")}
            roundedValue="full"
            size="md"
            icon={<Home />}
            title="Home"
          />
          <CategoriesCarousel loading={loading} data={data} />
        </div>

        <div className="flex lg:gap-4 gap-3">
          <Button
            onClick={() => navigate("/daily-game")}
            roundedValue="full"
            size="md"
            icon={<Gamepad2 />}
            title="Add"
          />

          <Button
            onClick={open}
            roundedValue="full"
            size="md"
            icon={<Plus />}
            title="Add"
          />
        </div>
      </nav>

      {isVisible && <AddModal onClose={close} />}
    </div>
  );
}

export default Sidebar;
