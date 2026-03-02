import type { SearchResult } from "../../hooks/useSearch";
import FeaturedResultCard from "./FeaturedResultCard";
import FilterButtons from "./FilterButtons";
import SearchHeader from "./SearchHeader";

type SearchProps = {
  q: string;
  data: SearchResult | null;
  loading: boolean;
};

export default function SearchSidebar({ q, data, loading }: SearchProps) {
  return (
    <div className="flex flex-col gap-4 ">
      <SearchHeader q={q} />
      <FilterButtons />
      <FeaturedResultCard data={data} loading={loading} />
    </div>
  );
}
