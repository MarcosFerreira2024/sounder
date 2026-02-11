import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const buttons: { value: string; label: string }[] = [
    { value: "all", label: "Tudo" },
    { value: "musics", label: "Músicas" },
    { value: "artists", label: "Artistas" },
    { value: "albums", label: "Álbuns" },
    { value: "playlists", label: "Playlists" },
    { value: "profiles", label: "Perfis" },
  ];
  const findActiveFromURL = () => {
    const button = buttons.find(
      (button) => button.value === searchParams.get("type"),
    );
    if (!button) return buttons[0];

    return button;
  };

  const [active, setActive] = useState(findActiveFromURL());

  const changeType = ({ value, label }: { value: string; label: string }) => {
    updateQueryParam("type", value);
    setActive({ value, label });
  };

  const updateQueryParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, value);
      return params;
    });
  };

  useEffect(() => {
    setActive(findActiveFromURL());
  }, [searchParams]);

  return { buttons, changeType, active, searchParams };
}

export default useFilters;
