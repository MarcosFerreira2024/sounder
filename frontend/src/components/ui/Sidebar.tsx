import Button from "./Button";
import { Gamepad2, Home, LogOut, Plus } from "lucide-react";
import CategoriesCarousel from "../CategoriesCarousel";
import useVisibility from "../../hooks/useVisibility";
import AddPlaylistModal from "../playlist/AddPlaylistModal";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { close, isVisible, open } = useVisibility(false);
  const { handleSignOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-2 mt-2 min-h-[94px] flex bg-neutral-900 border border-neutral-800 rounded-2xl">
      <nav className="flex flex-1   items-center px-4 py-2.5 rounded-2xl  justify-between bg-neutral-950 border-neutral-900">
        <div className="flex items-center gap-4 ">
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
          <CategoriesCarousel />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/daily-game")}
            roundedValue="full"
            size="md"
            icon={<Gamepad2 />}
            title="Add"
          />

          <Button
            onClick={() => open()}
            roundedValue="full"
            size="md"
            icon={<Plus />}
            title="Add"
          />
        </div>
      </nav>

      {isVisible && <AddPlaylistModal onClose={close} />}
    </div>
  );
}

export default Sidebar;
