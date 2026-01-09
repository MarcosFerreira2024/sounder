import Button from "./Button";
import useLoginProviders from "../hooks/useLoginProviders";

function AuthProviders() {
  const { data } = useLoginProviders();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-full border-b border-neutral-400" />
        <h1 className="text-nowrap text-opacity">Faça login Com</h1>
        <div className="w-full border-b border-neutral-400" />
      </div>

      <div className="flex justify-between gap-4">
        {data.map((item) => (
          <Button
            type="button"
            role="button
            "
            onClick={item.onClick}
            key={item.text}
            title={item.tooltip}
            icon={item.icon}
            className="w-full  gap-2"
            size="lg"
            roundedValue="md"
          >
            {item.text}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default AuthProviders;
