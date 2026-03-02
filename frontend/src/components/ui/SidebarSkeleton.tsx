export function SidebarSkeleton() {
  return (
    <div className="w-full h-full relative p-1 lg:p-2 mt-2 min-h-[94px] flex relative bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse">
      <nav className="flex flex-1 gap-10 justify-between items-center lg:px-4 px-2 rounded-2xl bg-neutral-950 border-neutral-900">
        <div className="flex items-center lg:gap-4 gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-full" />

          <div className="w-10 h-10 bg-neutral-800 rounded-full" />

          <div className=" lg:static lg:translate-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center  gap-2 ml-2 ">
            <div className="w-[16px] h-[16px] bg-neutral-800  " />
            <div className="md:flex items-center max-w-[248px] overflow-hidden gap-10">
              <div className="w-[56px] h-[56px] md:block hidden bg-neutral-800 rounded-xl" />
              <div className="w-[56px] h-[56px] md:block hidden bg-neutral-800 rounded-xl" />
              <div className="w-[56px] h-[56px] bg-neutral-800 rounded-xl" />
            </div>

            <div className="w-[16px] h-[16px] bg-neutral-800   " />
          </div>
        </div>

        <div className="flex lg:gap-4 gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-full" />
          <div className="w-10 h-10 bg-neutral-800 rounded-full" />
        </div>
      </nav>
    </div>
  );
}
