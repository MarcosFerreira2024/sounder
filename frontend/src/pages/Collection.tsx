import { useState } from "react";
import { CollectionProvider } from "../contexts/CollectionContext";
import { useParams } from "react-router-dom";
import CollectionContent from "../components/collection/CollectionContent";

type CollectionProps = {
  type: "album" | "playlist" | "recommendation" | "music";
};

function Collection({ type }: CollectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleLyricsVisibilty = () => {
    setIsVisible(!isVisible);
  };

  const params = useParams();

  const id =
    type === "recommendation"
      ? undefined
      : params[`${type}Id` as keyof typeof params];

  return (
    <CollectionProvider id={id} collectionType={type}>
      <CollectionContent
        toggleLyricsVisibilty={toggleLyricsVisibilty}
        isLyricsVisible={isVisible}
        showExtraControls={type === "recommendation"}
      />
    </CollectionProvider>
  );
}

export default Collection;
