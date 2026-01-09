import React from "react";
type InputLabelProps = {
  name: string;
  text: string;
  type: "password" | "email" | "number" | "text";
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
};
function InputLabel({
  name,
  onChange,
  placeholder,
  text,
  type,
  value,
}: InputLabelProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-main text-xl">
        {text}:
      </label>
      <input
        className="placeholder:text-opacity hover:bg-neutral-800 duration-200 ease-out text-main outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 text-sm h-[12.5] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4"
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default InputLabel;
