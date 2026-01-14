import Button from "./Button";
import { Home, Plus } from "lucide-react";
import CategoriesCarousel from "../CategoriesCarousel";
import useVisibility from "../../hooks/useVisibility";
import { ModalWrapper } from "./ModalWrapper";
import AddPlaylistModal from "../playlist/AddPlaylistModal";

function Sidebar() {
  const { close, isVisible, open } = useVisibility(false);

  return (
    <div className="w-full h-full p-2 mt-2  bg-neutral-900 border border-neutral-800 rounded-2xl">
      <div className="flex   items-center px-4 py-2.5 rounded-2xl  justify-between bg-neutral-950 border-neutral-900">
        <div className="flex items-center gap-10">
          <Button roundedValue="full" size="md" icon={<Home />} title="Home" />

          <CategoriesCarousel />
        </div>
        <Button
          onClick={() => open()}
          roundedValue="full"
          size="md"
          icon={<Plus />}
          title="Add"
        />
      </div>

      {isVisible && <AddPlaylistModal onClose={close} />}
    </div>
  );
}

export default Sidebar;
