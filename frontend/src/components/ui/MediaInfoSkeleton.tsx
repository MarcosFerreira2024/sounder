export function MediaInfoHeaderSkeleton({
  showActions = true,
}: {
  showActions?: boolean;
}) {
  return (
    <div className="py-2 flex justify-between h-full min-h-24.5 max-h-24.5 items-center px-4 border border-neutral-800 bg-neutral-950 w-full rounded-2xl animate-pulse">
      <div className="flex items-start gap-2">
        <div className="rounded-full bg-neutral-800 w-14 h-14 md:w-18 md:h-18" />

        <div className="flex flex-col gap-2 justify-center">
          <div className="h-5 md:h-6 w-32 bg-neutral-800 rounded-md" />
          <div className="h-4 w-24 bg-neutral-800 rounded-md" />
        </div>
      </div>

      {showActions && (
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-neutral-800 rounded-full" />
        </div>
      )}
    </div>
  );
}
