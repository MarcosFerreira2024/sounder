import React from "react";

function Container({
  children,
  className,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{ height: "calc(100dvh - 184px)" }}
      className={`
        ${className}
        relative
        bg-neutral-900
        rounded-2xl
        border border-neutral-800
        grid gap-2
        p-2
      `}
    >
      {children}
    </section>
  );
}

export default Container;
