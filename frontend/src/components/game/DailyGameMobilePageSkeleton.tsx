import Container from "../ui/Container";

function DailyGameMobilePageSkeleton() {
  return (
    <Container className="flex h-full lg:hidden flex-col gap-4 w-full animate-pulse">
      <div className="flex flex-col  gap-4">
        <div className="h-full max-h-22.5 w-full p-4 bg-neutral-950 flex rounded-2xl border border-neutral-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col w-full items-center justify-center gap-2 not-last:border-r-2 not-last:border-r-neutral-800"
            >
              <div className="h-6 w-10 bg-neutral-800 rounded-md" />
              <div className="h-4 w-16 bg-neutral-800 rounded-md" />
            </div>
          ))}
        </div>

        <div className="p-2 border border-neutral-800 h-[178px] bg-neutral-950 rounded-2xl">
          <div className="flex flex-col gap-4 items-center h-full justify-center  w-full relative">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-6 h-6 bg-neutral-800 rounded-full"
                />
              ))}
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="h-5 w-24 bg-neutral-800 rounded-md" />
              <div className="h-12 w-full bg-neutral-800 rounded-2xl border border-neutral-700" />
            </div>

            <div className="h-12 w-full bg-neutral-800 rounded-md" />
          </div>
        </div>
        <div className="w-full  overflow-hidden h-full rounded-2xl border bg-neutral-950  border-neutral-800 relative ">
          <div className="w-full h-full " />

          <div className="absolute bottom-2 left-0 p-4 w-full">
            <div className="h-[70px] w-full bg-neutral-800 rounded-xl" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DailyGameMobilePageSkeleton;
