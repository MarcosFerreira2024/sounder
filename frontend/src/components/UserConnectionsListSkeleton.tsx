type UserConnectionsListSkeletonProps = {
  count?: number;
};

function UserConnectionsListSkeleton({
  count = 9,
}: UserConnectionsListSkeletonProps) {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
      className="flex flex-col gap-2 items-center animate-pulse duration-100"
    >
      <div
        aria-hidden="true"
        className="  bg-neutral-900 min-w-70 min-h-70  rounded-full "
      />
      <div className="w-1/2 h-7.5 bg-neutral-900 rounded-2xl    " />
    </div>
  ));
}

export default UserConnectionsListSkeleton;
