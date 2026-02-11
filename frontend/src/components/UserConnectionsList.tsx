import MainLayout from "../layouts/MainLayout";
import ImageDisplayCardList from "./ui/ImageDisplayCardList";
import UserConnectionsListSkeleton from "./UserConnectionsListSkeleton";

export type UserConnectionsListProps = {
  data:
    | {
        id: string;
        name: string;
        image?: string;
        onClick?: () => void;
      }[]
    | null;
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
            grid
            pr-4
            grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
            gap-8
          "
        >
          {data ? (
            <ImageDisplayCardList
              className={"min-w-70  rounded-full min-h-70 max-w-70 max-h-70 "}
              data={data}
            />
          ) : (
            <UserConnectionsListSkeleton />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserConnectionsList;
