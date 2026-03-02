type DisplayCardSkeletonProps = {
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
  showMenu?: boolean;
};

export function DisplayCardSkeleton({
  className,
  imageClassName,
  titleClassName,
  overlay,
  overlayClassName,
  showMenu,
}: DisplayCardSkeletonProps) {
  return (
    <div
      className={`
        relative animate-pulse
        flex items-center flex-col
        ${className}
      `}
    >
      {overlay && (
        <div
          aria-hidden
          className={`
            absolute inset-0 z-10
            ${overlayClassName ?? "bg-neutral-900/40"}
          `}
        />
      )}

      {(overlay || showMenu) && (
        <div className="absolute z-20 w-full flex justify-between p-2">
          <div
            className={`
              h-4 w-24 bg-neutral-800 rounded-md
              ${titleClassName}
            `}
          />

          {showMenu && <div className="h-5 w-5 bg-neutral-700 rounded-md" />}
        </div>
      )}

      <div
        className={`
          w-full
          rounded-2xl
          border border-neutral-800
          bg-neutral-800
          shadow-md
          aspect-square
          ${imageClassName}
        `}
      />

      {!overlay && (
        <div
          className={`
            h-4 w-28 bg-neutral-800 rounded-md mt-2
            ${titleClassName}
          `}
        />
      )}
    </div>
  );
}
