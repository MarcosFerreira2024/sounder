import Button from "../ui/Button";
import useFilters from "../../hooks/useFilters";

function FilterButtons() {
  const { buttons, changeType, active } = useFilters();

  return (
    <nav className="flex gap-2 justify-between flex-wrap ">
      {buttons.map((button) => (
        <Button
          size="xs"
          roundedValue="md"
          variant={button.value === active.value ? "active" : "default"}
          onClick={() => changeType(button)}
          className="shrink-0  flex-1 lg:max-w-[120px] max-w-[140px]  py-1"
          key={button.value}
        >
          {button.label}
        </Button>
      ))}
    </nav>
  );
}

export default FilterButtons;
