import React from "react";
import Header from "../components/Header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 h-screen pb-4 px-4">
      <div className=" mx-auto w-full  flex flex-col">
        <Header />
        <div className=" h-full">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
