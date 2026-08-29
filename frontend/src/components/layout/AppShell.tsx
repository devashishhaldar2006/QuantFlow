"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../navigation/Sidebar";
import TopNavbar from "./TopNavbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isPublicRoute =
    pathname === "/" ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/terms") ||
    pathname?.startsWith("/privacy") ||
    pathname?.startsWith("/refund") ||
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/sso-callback");

  if (isPublicRoute) {
    return (
      <main className="w-full min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </main>
    );
  }

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