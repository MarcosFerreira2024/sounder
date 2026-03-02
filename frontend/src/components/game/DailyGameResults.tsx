import Button from "../ui/Button";
import Container from "../ui/Container";
import StatsList from "./StatsList";
import { X } from "lucide-react";
import type { GameState, GameStats } from "../../hooks/useGame";
import { AnimatePresence, motion } from "framer-motion";
import MusicPreviewButton from "../ui/MusicPreviewButton";
import DailyGameResultsSkeleton from "./DailyGameResultsSkeleton";

export type DailyGameResultsProps = {
  state: GameState;
  close: () => void;
  isVisible: boolean;
  stats?: GameStats;
  handleShare: () => void;
  showResults?: boolean;
  loading?: boolean;
};
function DailyGameResults({
  state,
  close,
  showResults,
  isVisible,
  stats,
  handleShare,
  loading,
}: DailyGameResultsProps) {
  if (loading && (state?.status === "FINISHED" || showResults)) {
    return <DailyGameResultsSkeleton isVisible={isVisible} />;
  }

  if (loading) return null;
  return (
    <AnimatePresence>
      {((state?.status === "FINISHED" && isVisible) || showResults) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed flex items-center justify-center z-100 gap-4 w-screen h-screen bg-black/70 backdrop-blur-md left-0 top-0"
        >
          <Container className="flex-1 md:flex hidden  overflow-hidden max-w-[580px] max-h-[400px] lg:max-h-[580px] relative">
            <img
              src={state?.image}
              className="rounded-2xl w-full h-full overflow-hidden border border-neutral-800 object-cover"
            />

            <div className="flex items-center absolute bottom-2 w-full left-0 p-4">
              <MusicPreviewButton
                single={true}
                data={{
                  audio: state?.audio!,
                  author: state?.artistName!,
                  cover: state?.image!,
                  name: state?.musicName!,
                }}
              />
            </div>
          </Container>

          <Container className="flex-1  max-w-[580px] max-h-[400px] lg:max-h-[580px] relative">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              size="xs"
              className="absolute right-1 top-1 z-120 bg-neutral-950"
              roundedValue="full"
              icon={<X size={16} />}
            />

            <div className="flex flex-col justify-between p-4 gap-4 bg-neutral-950 flex-1 rounded-2xl border border-neutral-800">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-main text-2xl">Resultados:</h1>
                  {stats && <StatsList variant="secondary" data={stats} />}
                </div>
                <div>
                  <MusicPreviewButton
                    single={true}
                    data={{
                      audio: state?.audio!,
                      author: state?.artistName!,
                      cover: state?.image!,
                      name: state?.musicName!,
                    }}
                  />
                </div>
                <div className="text-opacity text-sm">
                  Jogos todos os dias às 00:00 Brasília (UTC-3)
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button
                  size="md"
                  onClick={handleShare}
                  roundedValue="full"
                  variant="active"
                >
                  Compartilhar
                </Button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DailyGameResults;
