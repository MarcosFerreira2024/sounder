import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Header() {
  const navLinks = [
    {
      path: "/",
      name: "home",
    },
  ];

  const authLinks = [
    {
      path: "/login",
      name: "Entrar",
    },
  ];

  const navigate = useNavigate();

  return (
    <header className="items-center  h-[60px] flex justify-between">
      <img
        src="logo.png"
        onClick={() => navigate("/")}
        className="w-fit h-fit"
      />

      {authLinks.map((data) => (
        <div key={data.name}>
          <Button
            onClick={() => navigate(data.path)}
            className="cursor-pointer"
            size="md"
            roundedValue="md"
            title={data.name}
          >
            {data.name}
          </Button>
        </div>
      ))}
    </header>
  );
}

export default Header;
