import React from "react";

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-2 flex-col">
      <h1 className="text-main text-2xl">{title}:</h1>
      <div className="flex gap-4 ">{children}</div>
    </section>
  );
}

export default ContentSection;
