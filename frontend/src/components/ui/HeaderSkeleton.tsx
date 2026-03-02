import React from "react";

function HeaderSkeleton() {
  return (
    <header
      className="items-center sticky gap-4 top-0
        min-h-15 flex justify-between animate-pulse"
    >
      <div className="lg:w-[155px] w-[108px] h-10 bg-neutral-800 rounded-md" />

      <div className="flex gap-4 justify-end flex-1 items-center">
        <div className="h-10 w-full max-w-[300px] bg-neutral-800 rounded-md" />

        <div className="rounded-full bg-neutral-800 min-w-12 min-h-12 max-w-12 max-h-12" />
      </div>
    </header>
  );
}

export default HeaderSkeleton;
