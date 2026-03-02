import { useEffect, useRef } from "react";
import type { Artist } from "../../hooks/useSearch";
import { AnimatePresence, motion } from "framer-motion";

function SearchSugestion({
  artists,
  searchValue,
  handleSearchValue,
}: {
  artists: Artist[];
  searchValue: string;
  handleSearchValue: (value: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [artists]);

  return (
    <AnimatePresence key={artists.length}>
      {artists.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute  w-full h-fit   z-100 left-1/2 right-1/2 -translate-x-1/2 md:-translate-y-full -translate-y-[80%] overflow-hidden  p-2 bg-neutral-950   rounded-2xl border border-neutral-800 "
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            ref={scrollRef}
            className="  flex flex-col bg-neutral-800 rounded-2xl border-neutral-700 border max-h-[195px]   scrollbar-hide overflow-y-auto"
          >
            {artists.map((artist) => {
              const active = searchValue === artist.name;
              return (
                <div
                  onClick={() => handleSearchValue(artist.name)}
                  className={`${active && "text-neutral-200"} w-full flex gap-2 items-center duration-100 ease-in-out transition-all hover:text-neutral-950  px-2 py-2  not-last:border-b border-b-neutral-700 hover:bg-neutral-50 border-neutral-800  cursor-pointer text-opacity`}
                >
                  <img
                    src={artist.image ?? "/not-found.svg"}
                    alt={artist.name}
                    className="w-12 h-12 border border-neutral-700  shadow-md object-cover rounded-full"
                  />
                  <p>{artist.name}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchSugestion;
