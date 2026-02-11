import { useNavigate } from "react-router-dom";
import Button from "./Button";

import SearchInput from "./SearchInput";
import { authClient } from "../../libs/auth/auth";

function Header() {
  const session = authClient.useSession();

  const navigate = useNavigate();

  return (
    <header
      className="items-center sticky top-0
        min-h-15 flex justify-between "
    >
      <img
        src="/logo.png"
        onClick={() => navigate("/")}
        className="w-fit h-fit"
      />
      <div className="flex gap-4 justify-end flex-1">
        <SearchInput />
        {session.data ? (
          <img
            onClick={() => navigate(`/profile/${session.data?.user.id}`)}
            src={session.data.user.image ?? "/not-found.png"}
            className="rounded-full border border-neutral-900 max-w-12 max-h-12"
            alt={session.data.user.name}
            title={session.data.user.name}
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
