import React from "react";
import Input from "./Input";
type InputLabelProps = {
  name: string;
  text?: string;
  type: "password" | "email" | "number" | "text" | "search";
  onChange: (value: string) => void;
  handleKeyDown?: () => void;
  showLabel?: boolean;
  value?: string;
  placeholder: string;
};
function InputLabel({
  name,
  onChange,
  placeholder,
  text,
  handleKeyDown,
  type,
  showLabel = true,
  value,
}: InputLabelProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div className="flex flex-col  gap-1 w-full relative">
      {showLabel && (
        <label htmlFor={name} className="text-main text-xl">
          {text}
        </label>
      )}
      <Input
        onKeyDownCapture={handleKeyDown}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputLabel;
