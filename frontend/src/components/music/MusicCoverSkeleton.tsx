export function MusicCoverSkeleton({
  showExtraControls = true,
}: {
  showExtraControls?: boolean;
}) {
  return (
    <div className="relative overflow-hidden animate-pulse">
      <div className="absolute right-2 top-2 z-10">
        <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-700" />
      </div>

      <div className="border border-neutral-900 object-cover min-h-[300px] max-h-[300px] h-full lg:max-h-full w-full shadow-xl rounded-2xl bg-neutral-900" />

      {showExtraControls && (
        <div className="absolute w-full px-2 top-[50%]">
          <div className="justify-between w-full flex items-center">
            <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-900" />
            <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-900" />
          </div>
        </div>
      )}

      <div className="absolute bottom-2 px-2 w-full">
        <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl h-auto px-4 py-2 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <div className="h-8 w-8 min-w-8 min-h-8 rounded-full bg-neutral-800 border border-neutral-700" />

            <div className="w-full flex justify-between max-w-[400px] items-center gap-2">
              <div className="h-4 w-10 bg-neutral-800 rounded " />

              <div className="w-full bg-neutral-800 rounded-full h-1">
                <div className="bg-neutral-700 h-1 rounded-full w-1/3" />
              </div>

              <div className="h-4 w-10 bg-neutral-800 rounded" />
            </div>

            <div className="flex gap-2 items-center">
              <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700" />
              <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700" />
              <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
