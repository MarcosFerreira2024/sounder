import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import useConfetti from "../../hooks/useConfetti";

function NoRecommendations() {
  const { triggerConfetti } = useConfetti();

  const [count, setCount] = React.useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBlockedRef = useRef(false);

  useEffect(() => {
    if (count === 10) {
      window.alert("Parece que você realmente gosta de confetes");
    }
  }, [count]);

  useEffect(() => {
    triggerConfetti();
    const handleClick = () => {
      if (isBlockedRef.current) return;

      setCount((prevCount) => prevCount + 1);

      isBlockedRef.current = true;
      triggerConfetti();

      timeoutRef.current = setTimeout(() => {
        isBlockedRef.current = false;
      }, 500);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [triggerConfetti]);

  return (
    <div className=" flex-1 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center p-8 text-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl  text-main">Isso é tudo por agora!</h1>
        <p className="text-opacity max-w-md mx-auto">
          Você já interagiu com todas as músicas disponíveis. Este projeto é
          apenas uma demonstração e possui um conjunto limitado de dados.
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <p className="text-main ">Que tal testar seus conhecimentos?</p>
        <Link to="/daily-game">
          <Button
            size="md"
            roundedValue="full"
            variant="active"
            className="px-8"
          >
            Jogos Diários
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoRecommendations;
