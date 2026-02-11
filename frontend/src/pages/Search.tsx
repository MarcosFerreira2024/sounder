import Container from "../components/ui/Container";
import MainLayout from "../layouts/MainLayout";
import FeaturedResultCard from "../components/search/FeaturedResultCard";
import FilterButtons from "../components/search/FilterButtons";
import useSearch from "../hooks/useSearch";
import SearchResults from "../components/search/SearchResults";

function Search() {
  const { q, data, type } = useSearch();

  return (
    <MainLayout>
      <div className="flex gap-4">
        <Container className="w-1/3">
          <div className="flex flex-col gap-4">
            <div className="h-[98px] p-4 flex flex-col gap-0 shadow-md bg-neutral-950 border-neutral-800 border rounded-2xl">
              <h1 className="text-main text-2xl">Mostrando Resultados Para:</h1>
              <p className="text-opacity">{q}</p>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-4 shadow-md bg-neutral-950 border-neutral-800 border rounded-2xl">
              <FilterButtons />
              <FeaturedResultCard data={data} />
            </div>
          </div>
        </Container>
        <Container className="w-2/3  ">
          <SearchResults data={data} type={type} />
        </Container>
      </div>
    </MainLayout>
  );
}

export default Search;
