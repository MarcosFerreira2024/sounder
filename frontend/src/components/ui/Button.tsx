import React, { useRef } from "react";

type ButtonProps = {
  size: "xs" | "sm" | "md" | "lg";
  justify?: "center" | "start" | "end";
  icon?: string | React.ReactNode;
  variant?: "default" | "opacity" | "active" | "destructive" | "confirm";
  iconPosition?: "left" | "right";
  roundedValue: "sm" | "md" | "full" | "xl";
  children?: React.ReactNode;
  tooltipText?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  size,
  justify = "center",
  children,
  icon,
  variant = "default",
  iconPosition = "left",
  roundedValue,
  tooltipText,
  ...props
}: ButtonProps) {
  const sizes = {
    xs: {
      height: "24px",
      textSize: "12px",
      padding: icon ? "0px" : "8px",
    },
    sm: {
      height: "36px",
      textSize: "16px",
      padding: icon ? "0px" : "8px",
    },

    md: {
      height: "42px",
      textSize: "20px",
      padding: icon ? "0px" : "16px",
    },
    lg: {
      height: "50px",
      textSize: "20px",
      padding: icon ? "0px" : "24px",
    },
  };

  const rounded = {
    sm: "8px",
    md: "16px",
    xl: "24px",
    full: "999px",
  };

  function renderIcon(icon: string | React.ReactNode) {
    if (typeof icon === "string") {
      return <img className="pointer-events-none" src={icon} />;
    } else {
      return icon;
    }
  }

  const variants = {
    default: `bg-neutral-900 border disabled:opacity-50 
       hover:bg-neutral-800 outline-none  border-neutral-800 text-main   `,
    opacity: `bg-neutral-900 border border-neutral-800 text-opacity hover:bg-neutral-800 `,

    active: `bg-neutral-50 border border-neutral-200 text-neutral-900 font-inter`,
    destructive: `hover:bg-red-700 bg-red-900 border border-red-800 text-neutral-200 font-inter`,
    confirm: `hover:bg-lime-800 bg-lime-700 border border-lime-800 text-neutral-200 font-inter`,
  };

  return (
    <button
      style={{
        minHeight: sizes[size].height,
        minWidth: sizes[size].height,
        fontSize: props.className?.includes("text") ? "" : sizes[size].textSize,
        borderRadius: rounded[roundedValue],
        justifyContent: justify,
        paddingInline: sizes[size].padding,
      }}
      {...props}
      className={`${props.className} ${variants[variant]} cursor-pointer shadow-md gap-2  outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 duration-200 ease-out flex items-center`}
    >
      {icon && iconPosition === "left" && renderIcon(icon)}
      {children && children}
      {icon && iconPosition === "right" && renderIcon(icon)}
    </button>
  );
}

export default Button;
