import React from "react";
import Input from "./Input";
type InputLabelProps = {
  name: string;
  text?: string;
  type: "password" | "email" | "number" | "text" | "search";
  onChange?: (value: string) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
  showLabel?: boolean;
  value?: string;
  placeholder: string;
  disabled?: boolean;
};
function InputLabel({
  name,
  onChange,
  placeholder,
  handleChange,
  text,
  disabled,
  handleKeyDown,
  type,
  showLabel = true,
  value,
}: InputLabelProps) {
  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.value);

  return (
    <div className="flex flex-col  gap-1 w-full relative">
      {showLabel && (
        <label htmlFor={name} className="text-main text-lg lg:text-xl">
          {text}
        </label>
      )}
      <Input
        disabled={disabled}
        onKeyDownCapture={handleKeyDown}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange ?? change}
      />
    </div>
  );
}

export default InputLabel;
