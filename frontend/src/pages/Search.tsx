import MainLayout from "../layouts/MainLayout";
import useSearch from "../hooks/useSearch";
import Container from "../components/ui/Container";
import SearchSidebar from "../components/search/SearchSidebar";
import SearchResults from "../components/search/SearchResults";

export default function SearchPage() {
  const { q, data, type, loading } = useSearch();

  return (
    <MainLayout>
      <div className="lg:hidden">
        <Container>
          <div className="flex flex-col gap-6 p-2 bg-neutral-950 overflow-y-auto scrollbar-hide rounded-2xl border border-neutral-800">
            <SearchSidebar loading={loading} q={q} data={data} />
            <SearchResults loading={loading} data={data} type={type} />
          </div>
        </Container>
      </div>

      <div className="hidden lg:flex gap-4">
        <Container className="xl:w-1/3 w-1/2">
          <div className="flex flex-col gap-6 p-4 bg-neutral-950 overflow-y-auto scrollbar-hide rounded-2xl border border-neutral-800">
            <SearchSidebar loading={loading} q={q} data={data} />
          </div>
        </Container>

        <Container className="xl:w-2/3 w-1/2">
          <div className="flex flex-col gap-10 p-4 bg-neutral-950 overflow-y-auto scrollbar-hide rounded-2xl border border-neutral-800">
            <SearchResults loading={loading} data={data} type={type} />
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
