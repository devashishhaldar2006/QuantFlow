"use client";

import { useState } from "react";
import Sidebar from "../navigation/Sidebar";
import TopNavbar from "./TopNavbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex pt-[60px]">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main className={`flex-1 min-w-0 flex flex-col transition-all duration-200 ${isCollapsed ? 'md:ml-[64px]' : 'md:ml-[240px]'}`}>
          <div className="flex-1 min-w-0 w-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}