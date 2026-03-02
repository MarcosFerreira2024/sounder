import Stats from "./Stats";

function StatsList({
  data,
  variant = "default",
}: {
  data: { qtd: number; text: string }[];
  variant?: "default" | "secondary";
}) {
  const variants = {
    default:
      "bg-neutral-950 flex *:not-last:border-r-neutral-800 *:not-last:border-r-2   rounded-2xl  border-neutral-800",
    secondary:
      "bg-neutral-900 flex *:not-last:border-r-neutral-800 *:not-last:border-r-2   rounded-2xl  border-neutral-800",
  };

  return (
    <div className={` h-full max-h-22.5 w-full p-4  ${variants[variant]}`}>
      {data.map((item) => {
        return <Stats key={item.text} qtd={item.qtd} text={item.text} />;
      })}
    </div>
  );
}

export default StatsList;
