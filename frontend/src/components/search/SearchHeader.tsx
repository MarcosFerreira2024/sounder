type SearchHeaderProps = {
  q: string;
};

export default function SearchHeader({ q }: SearchHeaderProps) {
  return (
    <div className="h-[98px] p-4 flex flex-col shadow-md bg-neutral-950 border border-neutral-800 rounded-2xl">
      <h1 className="text-main text-xl lg:text-2xl">
        Mostrando Resultados Para:
      </h1>
      <p className="text-opacity">{q}</p>
    </div>
  );
}
