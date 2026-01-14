import { ProfileDisplayCard } from "./ProfileDisplayCard";

interface profileDisplayCardListProps {
  profiles: { id: string; name: string; image: string }[];
}

export function ProfileDisplayCardList({
  profiles,
}: profileDisplayCardListProps) {
  return (
    <div className="flex gap-4  overflow-hidden">
      {profiles.map((profile) => (
        <ProfileDisplayCard
          className={`min-w-[200px] max-h-[180px]  max-w-[200px]`}
          key={profile.id}
          id={profile.id}
          name={profile.name}
          image={profile.image}
        />
      ))}
    </div>
  );
}
