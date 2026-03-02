import type { GameState } from "../../hooks/useGame";
import type { Artist } from "../../hooks/useSearch";
import Button from "../ui/Button";
import InputLabel from "../ui/InputLabel";
import Lives from "./Lives";
import SearchSugestion from "./SearchSugestion";

type GameFormProps = {
  state: GameState | null;
  artists: Artist[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDebounce: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyboard: (e: React.KeyboardEvent) => void;
  searchValue: string;
  handleSearchValue: (value: string) => void;
  canAnswer: boolean;
  isSendingAnswer: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
};
function GameForm({
  state,
  artists,
  handleSubmit,
  handleDebounce,
  handleKeyboard,
  searchValue,
  handleSearchValue,
  canAnswer,
  isSendingAnswer,
  setShowResults,
}: GameFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full relative lg:max-w-[500px]"
    >
      <SearchSugestion
        artists={artists}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />

      <Lives qtdTries={state?.tries ?? 0} />

      <InputLabel
        disabled={!canAnswer}
        text="Palavra"
        name="word"
        handleChange={handleDebounce}
        handleKeyDown={handleKeyboard}
        placeholder="Digite uma palavra"
        type="text"
        showLabel
        value={searchValue}
      />

      <Button
        className="text-sm w-full"
        variant="opacity"
        roundedValue="md"
        disabled={isSendingAnswer}
        onClick={canAnswer ? () => {} : () => setShowResults(true)}
        size="lg"
      >
        {isSendingAnswer ? "Enviando..." : "Adivinhar"}
      </Button>
    </form>
  );
}

export default GameForm;
