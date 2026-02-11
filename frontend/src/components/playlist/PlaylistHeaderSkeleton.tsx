import React from "react";

function PlaylistHeaderSkeleton({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: null | any;
}) {
  if (isLoading || data === null) {
    return (
      <div
        aria-hidden
        className="py-2 flex justify-between h-full min-h-24.5 max-h-24.5 items-center px-4 bg-neutral-950 animate-pulse w-full rounded-2xl"
      >
        <div className="flex items-start gap-2">
          <div className="rounded-full border border-neutral-900 animate-pulse bg-neutral-900 w-18 h-18" />

          <div className="flex flex-col gap-2 ">
            <div className="bg-neutral-900 w-60 h-10 rounded-xl animate-pulse" />
            <div className="bg-neutral-900 w-60 h-6 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistHeaderSkeleton;
