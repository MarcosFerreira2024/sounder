import React from "react";

function Container({
  children,
  className,
  loading,
}: {
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}) {
  if (loading)
    return (
      <div
        style={{ height: "calc(100dvh - 184px)" }}
        className={`
        ${className}
        relative
        bg-neutral-900
        rounded-2xl
        border border-neutral-800
        animate-pulse
        grid gap-2
        lg:p-2
        p-1
      `}
      >
        {children}
      </div>
    );

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
        lg:p-2
        p-1
      `}
    >
      {children}
    </section>
  );
}

export default Container;
