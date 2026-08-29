"use client";

import { Bell, Search, Menu, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "../navigation/navigation";

type TopNavbarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
};

export default function TopNavbar({ isCollapsed, setIsCollapsed }: TopNavbarProps) {
  const pathname = usePathname();
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
          <div className="flex size-6 items-center justify-center rounded-md bg-indigo-500/20">
            <Zap className="size-3.5 text-indigo-400" />
          </div>
          <span className="text-[14px] font-bold tracking-tight text-slate-100 select-none hidden sm:block">
            QuantFlow
          </span>
        </div>

        {/* Search — takes remaining space */}
        <div className="flex-1 min-w-0 max-w-[360px]">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-600 group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search strategies, backtests..."
              className="h-8 w-full rounded-lg border border-white/6 bg-white/4 pl-9 pr-16 text-[13px] text-slate-300 placeholder-slate-600 outline-none transition-all focus:border-indigo-500/40 focus:bg-white/6 focus:ring-1 focus:ring-indigo-500/20"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/8 bg-white/5 px-1.5 font-mono text-[10px] text-slate-600 pointer-events-none whitespace-nowrap">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Spacer — pushes actions right */}
        <div className="flex-1" />

        {/* Mobile page title — visible only on mobile, centered */}
        <div className="absolute left-1/2 -translate-x-1/2 sm:hidden">
          <span className="text-sm font-semibold text-slate-200">
            {currentPage?.label ?? "QuantFlow"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex size-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white/5 hover:text-slate-300"
          >
            <Bell className="size-4" />
          </button>

          {/* Avatar */}
          <div className="ml-1 flex size-8 items-center justify-center rounded-lg border border-white/8 bg-slate-800/60 text-[11px] font-semibold text-slate-300 select-none">
            DH
          </div>
        </div>

      </div>
    </header>
  );
}