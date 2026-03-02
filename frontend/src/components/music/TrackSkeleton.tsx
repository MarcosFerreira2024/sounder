import { MoreVertical } from "lucide-react";

function TrackSkeleton({ index }: { index: number }) {
  return (
    <div
      style={{ opacity: index / 10 + 0.05 }}
      className={`bg-neutral-950   border animate-pulse  border-neutral-800 rounded-2xl max-h-17.5 min-h-17.5 flex items-center justify-between px-3`}
    >
      <div className="flex gap-3 items-center ">
        <div className="h-9 w-9 bg-neutral-900 rounded-full animate-pulse" />

        <div className="w-11 h-11 rounded-full bg-neutral-800 border animate-pulse  border-neutral-800 shadow-md" />
        <div className="flex gap-1 flex-col">
          <p className="text-main text-lg bg-neutral-900 rounded-lg animate-pulse w-20 h-5 " />
          <p className="text-opacity text-sm bg-neutral-900 rounded-lg animate-pulse w-16 h-4" />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <MoreVertical className="text-opacity animate-pulse" />
      </div>
    </div>
  );
}

export default TrackSkeleton;
