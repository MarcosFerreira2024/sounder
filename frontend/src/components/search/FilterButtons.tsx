import Button from "../ui/Button";
import useFilters from "../../hooks/useFilters";

function FilterButtons() {
  const { buttons, changeType, active } = useFilters();

  return (
    <nav className="flex gap-2">
      {buttons.map((button) => (
        <Button
          size="xs"
          roundedValue="md"
          variant={button.value === active.value ? "active" : "default"}
          onClick={() => changeType(button)}
          className="flex-1 py-1"
          key={button.value}
        >
          {button.label}
        </Button>
      ))}
    </nav>
  );
}

export default FilterButtons;
