import MainLayout from "../layouts/MainLayout";
import useGame from "../hooks/useGame";
import DailyGameResults from "../components/game/DailyGameResults";
import DailyGameMobilePage from "../components/game/DailyGameMobilePage";
import DailyGameDesktopPage from "../components/game/DailyGameDesktop";

function DailyGame() {
  const {
    state,
    stats,
    artists,
    searchValue,
    isSendingAnswer,
    isVisible,
    handleSearchValue,
    handleDebounce,
    handleKeyboard,
    close,
    handleSubmit,
    handleShare,
    showResults,
    setShowResults,
    isLoadingState,
  } = useGame();

  const canAnswer = state && state.status === "IN_PROGRESS" && !isSendingAnswer;

  const gameExists = !!state;

  return (
    <MainLayout>
      {gameExists || isLoadingState ? (
        <>
          <DailyGameResults
            handleShare={handleShare}
            close={close}
            stats={stats!}
            showResults={showResults}
            isVisible={isVisible}
            state={state!}
            loading={isLoadingState}
          />

          <DailyGameMobilePage
            isLoadingState={isLoadingState}
            state={state}
            stats={stats}
            artists={artists}
            searchValue={searchValue}
            canAnswer={canAnswer ?? true}
            handleDebounce={handleDebounce}
            handleKeyboard={handleKeyboard}
            handleSearchValue={handleSearchValue}
            handleSubmit={handleSubmit}
            setShowResults={setShowResults}
            isSendingAnswer={isSendingAnswer}
          />

          <DailyGameDesktopPage
            isLoadingState={isLoadingState}
            state={state}
            stats={stats}
            artists={artists}
            searchValue={searchValue}
            canAnswer={canAnswer ?? true}
            handleDebounce={handleDebounce}
            handleKeyboard={handleKeyboard}
            handleSearchValue={handleSearchValue}
            handleSubmit={handleSubmit}
            setShowResults={setShowResults}
            isSendingAnswer={isSendingAnswer}
          />
        </>
      ) : (
        <div className="h-full flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-2xl text-main">Game not created yet</h1>
          <p className="text-opacity">Try again later</p>
        </div>
      )}
    </MainLayout>
  );
}

export default DailyGame;
