export function ProfileAboutSectionSkeleton() {
  return (
    <div className="p-4 bg-neutral-950 border flex-1 border-neutral-800 shadow-md rounded-2xl animate-pulse">
      <div className="flex flex-col justify-between">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between items-start">
            <div className="h-[52px] w-24 bg-neutral-800 rounded-md md:h-8 md:w-28" />

            <div className="flex gap-4 justify-end w-full  ">
              <div className="flex  overflow-hidden flex-col items-center gap-3">
                <div className="h-6 w-6 bg-neutral-800 rounded-md " />
                <div className="h-4 w-18 bg-neutral-800 rounded-md " />
              </div>

              <div className="flex  overflow-hidden flex-col items-center gap-3">
                <div className="h-6 w-6 bg-neutral-800 rounded-md " />
                <div className="h-4 w-18 bg-neutral-800 rounded-md " />
              </div>
            </div>
          </div>

          <div className="h-[140px] space-y-3">
            <div className="h-4 bg-neutral-800 rounded-md w-full" />
            <div className="h-4 bg-neutral-800 rounded-md w-full" />
            <div className="h-4 bg-neutral-800 rounded-md w-full" />
            <div className="h-4 bg-neutral-800 rounded-md w-full" />
            <div className="h-4 bg-neutral-800 rounded-md w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
