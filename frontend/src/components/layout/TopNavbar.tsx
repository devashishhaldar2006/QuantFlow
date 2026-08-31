"use client";

import { Bell, Search, Menu, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { navigation } from "../navigation/navigation";

type TopNavbarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
};

export default function TopNavbar({ isCollapsed, setIsCollapsed }: TopNavbarProps) {
  const pathname = usePathname();

  const { isSignedIn, isLoaded } = useAuth();

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

  if (isPublicRoute && (!isLoaded || !isSignedIn)) {
    return null;
  }

  const currentPage = navigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-white/5 bg-[#050A12]/95 backdrop-blur-2xl">
      <div className="flex h-full items-center px-4 gap-3">

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white/5 hover:text-slate-200"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-4" />
        </button>

        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2 mr-4">
          <div className="flex size-7 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20">
            <Zap className="size-3.5 text-white fill-current" />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-white select-none hidden sm:block">
            Quant<span className="text-indigo-400">Flow</span>
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-0 max-w-[360px]">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
            <input
              type="text"
              placeholder="Search strategies, tickers, orders..."
              className="h-8 w-full rounded-lg border border-white/5 bg-slate-900/60 pl-8 pr-12 text-xs text-slate-200 placeholder-slate-500 transition-all focus:border-indigo-500/40 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500/20"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-slate-800/60 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 select-none">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Active Page Indicator */}
        {currentPage && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.02] border border-white/5 text-xs text-slate-400">
            <span className="text-slate-500">View:</span>
            <span className="font-semibold text-slate-200">{currentPage.label}</span>
          </div>
        )}

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="relative flex size-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/5 hover:text-slate-200"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-indigo-500" />
          </button>

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "size-8 rounded-full border border-indigo-500/30",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}