"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Sidebar from "../navigation/Sidebar";
import TopNavbar from "./TopNavbar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPublicRoute =
    pathname === "/" ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/terms") ||
    pathname?.startsWith("/privacy") ||
    pathname?.startsWith("/refund") ||
    pathname?.startsWith("/contact") ||
    pathname?.startsWith("/sso-callback");

  // While auth state is initializing or if user is logged out on a public route (including /about), render standalone layout without terminal chrome
  if (isPublicRoute && (!isLoaded || !isSignedIn)) {
    return (
      <main className="w-full min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </main>
    );
  }

  // When logged in (or on protected app routes), render institutional terminal chrome with TopNavbar and Sidebar
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopNavbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex pt-[60px]">
        <Sidebar
          isCollapsed={isCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className={`flex-1 min-w-0 flex flex-col transition-all duration-200 ${isCollapsed ? 'md:ml-[64px]' : 'md:ml-[240px]'}`}>
          <div className="flex-1 min-w-0 w-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}