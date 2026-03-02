export function ModalWrapperSkeleton({
  className,
  hasSubtitle = true,
  children,
}: {
  className?: string;
  hasSubtitle?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-100">
      <div
        className={`${
          className ?? "max-w-[460px] w-full"
        } bg-neutral-900 border-neutral-800 shadow-md border rounded-lg md:p-2 p-1 relative animate-pulse`}
      >
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral-800" />

        <div className="p-4 flex flex-col gap-4 bg-neutral-950 border border-neutral-900 rounded-2xl">
          <div className="flex flex-col gap-2">
            <div className="w-40 h-6 rounded bg-neutral-800" />

            {hasSubtitle && <div className="w-28 h-4 rounded bg-neutral-800" />}
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
