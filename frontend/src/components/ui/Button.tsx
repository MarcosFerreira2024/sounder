import React, { useRef } from "react";

type ButtonProps = {
  size: "xs" | "sm" | "md" | "lg";
  justify?: "center" | "start" | "end";
  icon?: string | React.ReactNode;
  variant?: "default" | "rounded";
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
      textSize: "12px",
      padding: icon ? "0px" : "8px",
    },

    md: {
      height: "42px",
      textSize: "16px",
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

  return (
    <button
      style={{
        minHeight: sizes[size].height,
        minWidth: sizes[size].height,
        fontSize: sizes[size].textSize,
        borderRadius: rounded[roundedValue],
        justifyContent: justify,
        paddingInline: sizes[size].padding,
      }}
      {...props}
      className={`${props.className} 
      bg-neutral-900 border hover:bg-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 duration-200 ease-out border-neutral-800 text-main shadow-2xl flex items-center`}
    >
      {icon && iconPosition === "left" && renderIcon(icon)}
      {children && children}
      {icon && iconPosition === "right" && renderIcon(icon)}
    </button>
  );
}

export default Button;
