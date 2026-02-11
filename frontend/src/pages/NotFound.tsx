import { Home } from "lucide-react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-main text-6xl">404</h1>
        <p className="text-main text-5xl">Page not found</p>
      </div>

      <Button
        roundedValue="sm"
        onClick={() => navigate("/")}
        title="Voltar para home"
        size="md"
        icon={<Home />}
      />
    </div>
  );
}

export default NotFound;
