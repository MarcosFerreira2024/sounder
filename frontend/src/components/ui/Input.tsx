import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ ...props }: InputProps) {
  return (
    <input
      className="placeholder:text-opacity w-full not-disabled:hover:bg-neutral-800 duration-200 ease-out text-main outline-none focus-within:ring-2 focus-within:ring-neutral-600 text-sm h-full max-h-12.5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-md p-4"
      {...props}
    />
  );
}

export default Input;
