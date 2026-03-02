import { useNavigate } from "react-router-dom";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { useAuthProvider } from "../../contexts/AuthContext";
import Image from "./Image";
import HeaderSkeleton from "./HeaderSkeleton";

function Header() {
  const { data, isPending, isRefetching } = useAuthProvider();
  const navigate = useNavigate();

  const isLoading = isPending || isRefetching;

  if (isLoading) return <HeaderSkeleton />;

  return (
    <header
      className="items-center sticky gap-4 top-0
        min-h-15 flex justify-between "
    >
      <Image
        src="/logo.png"
        onClick={() => navigate("/")}
        className="w-27 object-cover lg:w-fit lg:h-fit"
      />

      <div className="flex gap-4 justify-end flex-1">
        <SearchInput />

        {data?.session ? (
          <Image
            onClick={() => navigate(`/profile/${data?.user.id}`)}
            src={data?.user.image ?? "/not-found.svg"}
            className="rounded-full border border-neutral-900 min-w-12 min-h-12 max-w-12 max-h-12"
            onError={(e) => {
              e.currentTarget.src = "/not-found.svg";
            }}
            alt={data?.user.name}
            title={data?.user.name}
          />
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="cursor-pointer"
            size="md"
            roundedValue="md"
            title="Entrar"
          >
            Entrar
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
