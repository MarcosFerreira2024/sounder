import { ProfileDisplayCard } from "./ProfileDisplayCard";

interface ProfileDisplayCardListProps {
  isLoading: boolean;
  profiles: { id: string; name: string; image: string }[] | null;
}

export function ProfileDisplayCardList({
  profiles,
  isLoading,
}: ProfileDisplayCardListProps) {
  return (
    <div className="flex gap-4 overflow-hidden">
      <div className="flex gap-4 overflow-hidden">
        {isLoading || !profiles
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                aria-hidden="true"
                className="h-43.75 min-w-43.75 bg-neutral-900/100 rounded-2xl animate-pulse"
              />
            ))
          : profiles.map((profile) => (
              <ProfileDisplayCard
                key={profile.id}
                className="min-w-43.75 min-h-43.75 max-w-43.75 max-h-43.75 "
                id={profile.id}
                name={profile.name}
                image={profile.image ?? "/not-found.png"}
              />
            ))}
      </div>
    </div>
  );
}
