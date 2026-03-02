import { ModalWrapperSkeleton } from "../ui/ModalWrapperSkeleton";

function AddTracksToPlaylistSkeleton() {
  return (
    <ModalWrapperSkeleton hasSubtitle>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-xl bg-neutral-800" />

          <div className="flex items-start gap-2">
            <div className="w-[120px] h-[120px] rounded-2xl bg-neutral-800" />

            <div className="flex flex-col gap-3">
              <div className="w-32 h-4 rounded bg-neutral-800" />

              <div className="w-20 h-3 rounded bg-neutral-800" />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full h-10 animate-pulse rounded-2xl bg-neutral-800" />
        </div>
      </div>
    </ModalWrapperSkeleton>
  );
}

export default AddTracksToPlaylistSkeleton;
