export function LyricsSkeleton() {
  return (
    <>
      <div className="min-h-[400px]">
        <div className="grid gap-10 p-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`
                h-8 rounded-md bg-neutral-900 animate-pulse
                ${getRandomWidth(index)}
              `}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function getRandomWidth(index: number) {
  const widths = ["w-4/4", "w-2/3", "w-5/6", "w-1/2", "w-4/5", "w-2/4"];

  return widths[index % widths.length];
}
