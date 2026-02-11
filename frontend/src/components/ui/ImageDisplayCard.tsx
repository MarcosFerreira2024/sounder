export type ImageDisplayCardProps = {
  name?: string;
  image?: string | null;
  className?: string;
  onClick?: () => void;
};

export function ImageDisplayCard({
  name,
  image,
  className,
  onClick,
}: ImageDisplayCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer shadow-md grid  items-center text-center  gap-2 group"
    >
      <img
        src={image ?? "/not-found.png"}
        alt={name ?? "Imagem"}
        className={`${className} object-cover group-hover:opacity-80 bg-neutral-900 border border-neutral-800 rounded-2xl`}
      />
      {name && (
        <h2 className="text-opacity text-base  w-full h-full">{name}</h2>
      )}
    </div>
  );
}
