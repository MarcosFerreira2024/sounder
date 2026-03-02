import React from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 h-screen">
      <div className="mx-auto w-full  flex flex-col h-[calc(100dvh - 16px)] lg:pt-2 pt-1 pb-1 px-2 lg:pb-2 lg:px-4">
        <Header />
        <div className="flex flex-col flex-1 ">{children}</div>
        <Sidebar />
      </div>
    </div>
  );
}

export default MainLayout;
