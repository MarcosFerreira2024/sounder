import React from "react";
import MainLayout from "../layouts/MainLayout";
import { ProfileDisplayCard } from "./profile/ProfileDisplayCard";

type UserConnectionsListProps = {
  data: {
    id: string;
    name: string;
    image: string;
  }[];
};
function UserConnectionsList({ data }: UserConnectionsListProps) {
  return (
    <MainLayout>
      <div
        style={{ maxHeight: "calc(100dvh - 84px - 100px)" }}
        className="flex-1  overflow-y-auto py-4"
      >
        <div
          className="
            mx-auto
            grid
            pr-4
            grid-cols-[repeat(auto-fit,minmax(270px,1fr))]
            gap-8

          "
        >
          {data.map((profile) => (
            <ProfileDisplayCard
              className="rounded-full "
              key={profile.id}
              id={profile.id}
              name={profile.name}
              image={profile.image}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserConnectionsList;
