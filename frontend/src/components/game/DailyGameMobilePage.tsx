import Container from "../ui/Container";
import StatsList from "./StatsList";
import GameForm from "./GameForm";
import GameImage from "./GameImage";
import DailyGameMobilePageSkeleton from "./DailyGameMobilePageSkeleton";

export default function DailyGameMobilePage(props: any) {
  const { state, stats, canAnswer } = props;
  if (props.isLoadingState) return <DailyGameMobilePageSkeleton />;

  return (
    <Container className="flex lg:hidden flex-col gap-4 w-full">
      <div className="flex flex-col gap-4">
        {stats && <StatsList data={stats} />}
        <div className="p-2 border border-neutral-800 bg-neutral-950 rounded-2xl">
          <GameForm {...props} canAnswer={canAnswer} />
        </div>
      </div>

      <GameImage state={state} />
    </Container>
  );
}
