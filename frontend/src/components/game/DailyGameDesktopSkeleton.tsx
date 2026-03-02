import Container from "../ui/Container";

export default function DailyGameDesktopPageSkeleton() {
  return (
    <div className="hidden gap-4 overflow-hidden w-full lg:flex">
      <Container className="flex-1 md:flex hidden overflow-hidden  relative">
        <div className="rounded-2xl w-full h-full border border-neutral-800 bg-neutral-950 animate-pulse" />

        <div className="flex items-center absolute left-0 bottom-2 min-w-full p-4">
          <div className="h-[70px] w-full rounded-xl bg-neutral-800 animate-pulse" />
        </div>
      </Container>
      <Container className="flex-1">
        <div className="flex flex-col gap-2 animate-pulse">
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

          <div className="flex flex-col justify-center items-center p-4 bg-neutral-950 flex-1 rounded-2xl border border-neutral-800">
            <div className="flex flex-col gap-4 items-center w-full relative lg:max-w-[500px]">
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
        </div>
      </Container>
    </div>
  );
}
