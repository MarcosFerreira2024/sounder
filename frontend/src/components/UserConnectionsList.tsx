import MainLayout from "../layouts/MainLayout";
import DisplayCardList from "./ui/DisplayCardList";
import UserConnectionsListSkeleton from "./UserConnectionsListSkeleton";

export type UserConnectionsListProps = {
  data:
    | {
        id: string;
        title: string;
        image?: string;
        to: string;
        imageClassName: string;
      }[]
    | null;
};
function UserConnectionsList({ data }: UserConnectionsListProps) {
  const mappedData = data?.map((item) => {
    return {
      ...item,
      overlay: false,
    };
  });

  return (
    <MainLayout>
      <div
        style={{ maxHeight: "calc(100dvh - 84px - 100px)" }}
        className="flex-1  lg:scrollbar-default scrollbar-hide overflow-y-auto py-4"
      >
        <div
          className="
            grid
            pr-4
            grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
            gap-8
          "
        >
          {data ? (
            <DisplayCardList data={mappedData ?? []} />
          ) : (
            <UserConnectionsListSkeleton />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserConnectionsList;
