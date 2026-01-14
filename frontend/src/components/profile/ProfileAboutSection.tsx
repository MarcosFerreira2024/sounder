interface ProfileAboutSectionProps {
  description: string;
  followerCount: number;
  followingCount: number;
  images: string[];
}

export function ProfileAboutSection({
  description,
  followerCount,
  followingCount,
  images,
}: ProfileAboutSectionProps) {
  return (
    <div className="p-4 bg-neutral-950 border flex-1 border-neutral-900 shadow-2xl rounded-2xl">
      <div className="flex flex-col justify-between">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between">
            <h1 className="text-main text-3xl">Sobre</h1>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col text-center">
                <h1 className="text-main text-2xl">{followerCount}</h1>
                <p className="text-opacity text-sm">seguidores</p>
              </div>
              <div className="flex flex-col text-center">
                <h1 className="text-main text-2xl">{followingCount}</h1>
                <p className="text-opacity text-sm">seguindo</p>
              </div>
            </div>
          </div>
          <p className="text-opacity">{description}</p>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="max-w-[200px]  w-full h-full object-cover rounded-2xl border border-neutral-900 shadow-2xl max-h-[200px] "
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
