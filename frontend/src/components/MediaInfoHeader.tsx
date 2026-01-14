type MediaHeaderProps = {
  image: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
};

export function MediaInfoHeader({
  image,
  title,
  subtitle,
  children,
}: MediaHeaderProps) {
  return (
    <div className="py-2 flex justify-between h-full min-h-24.5 max-h-24.5 items-center px-4 bg-neutral-950 w-full rounded-2xl">
      <div className="flex items-start gap-2">
        <img
          src={image}
          className="rounded-full border border-neutral-900 w-18 h-18"
          alt={title}
        />

        <div className="flex flex-col font-inter">
          <h1 className="text-neutral-100 text-2xl">{title}</h1>
          <p className="text-neutral-400 text-base">{subtitle}</p>
        </div>
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
