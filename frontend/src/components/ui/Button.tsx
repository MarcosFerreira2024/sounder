import React from "react";
import Image from "./Image";

type ButtonProps = {
  size: "xs" | "sm" | "md" | "lg";
  justify?: "center" | "start" | "end";
  icon?: string | React.ReactNode;
  variant?: "default" | "opacity" | "active" | "destructive" | "confirm";
  iconPosition?: "left" | "right";
  roundedValue: "sm" | "md" | "xl" | "full";
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  size,
  justify = "center",
  children,
  icon,
  variant = "default",
  iconPosition = "left",
  roundedValue,
  className = "",
  ...props
}: ButtonProps) {
  const sizes = {
    xs: {
      base: "min-h-5 text-sm md:h-6 ",
      square: "min-w-5 md:w-6",
      padding: "px-1 md:px-2",
    },
    sm: {
      base: "min-h-8  md:h-9 ",
      square: "min-w-8 md:w-9",
      padding: "px-2 md:px-2",
    },
    md: {
      base: "min-h-9 text-base md:h-10 md:text-lg",
      square: "min-w-9 md:w-10",
      padding: "px-3 md:px-4",
    },
    lg: {
      base: "min-h-10 text-base md:h-12 md:text-lg",
      square: "min-w-10 md:w-12",
      padding: "px-4 md:px-6",
    },
  };

  const variants = {
    default:
      "bg-neutral-900 border border-neutral-800 text-main not-disabled:hover:bg-neutral-800 disabled:opacity-50",
    opacity:
      "bg-neutral-900 border border-neutral-800 text-opacity not-disabled:hover:bg-neutral-800",
    active:
      "bg-neutral-50 border border-neutral-200 text-neutral-900 font-inter",
    destructive:
      "bg-red-900 border border-red-800 text-neutral-200 not-disabled:hover:bg-red-700 font-inter",
    confirm:
      "bg-lime-700 border border-lime-800 text-neutral-200 not-disabled:hover:bg-lime-800 font-inter",
  };

  const rounded = {
    sm: "rounded-[8px]",
    md: "rounded-[16px]",
    xl: "rounded-[24px]",
    full: "rounded-full",
  };

  const currentSize = sizes[size];

  const dimensionClass =
    icon && !children
      ? `${currentSize.base} ${currentSize.square}`
      : `${currentSize.base} ${currentSize.padding}`;

  function renderIcon(icon: string | React.ReactNode) {
    if (typeof icon === "string") {
      return <Image className="pointer-events-none" src={icon} />;
    }
    return icon;
  }

  return (
    <button
      {...props}
      className={`
        ${dimensionClass}
        ${variants[variant]}
        ${rounded[roundedValue]}
        flex items-center gap-2
        justify-${justify}
        shadow-md
        transition-all duration-200 ease-out
        focus-visible:ring-2 focus-visible:ring-neutral-600
         text-nowrap
        ${className}
      `}
    >
      {icon && iconPosition === "left" && renderIcon(icon)}
      {children}
      {icon && iconPosition === "right" && renderIcon(icon)}
    </button>
  );
}

export default Button;
