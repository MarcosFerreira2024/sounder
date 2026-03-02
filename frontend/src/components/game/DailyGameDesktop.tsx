import Container from "../ui/Container";
import StatsList from "./StatsList";
import GameForm from "./GameForm";
import GameImage from "./GameImage";
import DailyGameDesktopPageSkeleton from "./DailyGameDesktopSkeleton";

export default function DailyGameDesktopPage(props: any) {
  const { state, stats, canAnswer } = props;

  if (props.isLoadingState) return <DailyGameDesktopPageSkeleton />;
  return (
    <div className="hidden gap-4 overflow-hidden w-full lg:flex">
      <Container className="w-1/2">
        <GameImage state={state} />
      </Container>

      <Container className="flex-1">
        <div className="flex flex-col gap-2">
          {stats && <StatsList data={stats} />}
          <div className="flex flex-col justify-center items-center p-4 bg-neutral-950 flex-1 rounded-2xl border border-neutral-800">
            <GameForm {...props} canAnswer={canAnswer} />
          </div>
        </div>
      </Container>
    </div>
  );
}
