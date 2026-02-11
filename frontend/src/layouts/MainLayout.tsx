import React from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 h-screen">
      <div className="mx-auto w-full flex flex-col h-[calc(100dvh - 16px)] pt-2 pb-2 px-4">
        <Header />
        <div style={{ minHeight: "calc(100dvh - 84px - 100px)" }}>
          {children}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default MainLayout;
