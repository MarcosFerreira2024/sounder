import { Heart, HeartCrack } from "lucide-react";

function Lives({ qtdTries }: { qtdTries: number }) {
  const maxLives = 5;

  const remainingLives = maxLives - qtdTries;

  return (
    <div>
      <div className="flex items-center gap-1">
        {Array.from({ length: qtdTries }).map((_, index) => (
          <HeartCrack key={index} className="text-red-500 " size={24} />
        ))}
        {Array.from({ length: remainingLives }).map((_, index) => (
          <Heart key={index} className="text-red-500 " size={24} />
        ))}
      </div>
    </div>
  );
}

export default Lives;
