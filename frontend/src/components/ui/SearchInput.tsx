import { Search, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

function SearchInput() {
  const { handleChange, search, handleSearch, cancel, onKeyDown } = useSearch();
  return (
    <label
      className="placeholder:text-opacity px-2 items-center py-3 h-[48px] max-w-[340px] w-full  flex-1 flex gap-2 hover:bg-neutral-800 duration-200 ease-out text-main outline-none focus-within:ring-2 focus-within:ring-neutral-600 text-sm  bg-neutral-900 border border-neutral-800 rounded-2xl shadow-md "
      htmlFor={"search"}
    >
      {<Search size={24} onClick={handleSearch} className="text-opacity" />}
      <input
        type="search"
        value={search}
        placeholder="Procure uma musica ou artista..."
        onKeyDownCapture={onKeyDown}
        onChange={handleChange}
        className="outline-none w-full"
      />
      {search && <X onClick={cancel} size={16} className="text-opacity" />}
    </label>
  );
}

export default SearchInput;
