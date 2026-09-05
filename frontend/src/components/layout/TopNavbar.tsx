"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Menu, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { navigation } from "../navigation/navigation";
import { GlobalSearchModal } from "../navigation/GlobalSearchModal";
import { NotificationPopover } from "./NotificationPopover";
import { QuantFlowLogo } from "../common/QuantFlowLogo";

type TopNavbarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean | ((prev: boolean) => boolean)) => void;
};

export default function TopNavbar({
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}: TopNavbarProps) {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut listener for Command/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const handleToggle = () => {
    // On mobile (< 768px), toggle the mobile drawer overlay
    if (window.innerWidth < 768) {
      if (setMobileOpen) {
        setMobileOpen((prev) => !prev);
      }
    } else {
      // On desktop (>= 768px), collapse/expand the left fixed sidebar
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-white/5 bg-[#050A12]/95 backdrop-blur-2xl">
        <div className="flex h-full items-center px-3 sm:px-4 gap-2.5 sm:gap-3">
          {/* Hamburger (Mobile: opens drawer; Desktop: collapses sidebar) */}
          <button
            type="button"
            onClick={handleToggle}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Brand */}
          <div className="flex shrink-0 items-center mr-2 sm:mr-4">
            <QuantFlowLogo className="size-6 sm:size-7" textClassName="text-sm font-extrabold hidden sm:inline-block" />
          </div>

          {/* Search Trigger */}
          <div className="flex-1 min-w-0 max-w-[360px]">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="relative group w-full flex items-center h-8 rounded-lg border border-white/5 bg-slate-900/60 px-3 text-xs text-slate-400 hover:border-indigo-500/40 hover:bg-slate-900 transition-all text-left"
            >
              <Search className="size-3.5 text-slate-500 mr-2 shrink-0 group-hover:text-indigo-400 transition-colors" />
              <span className="truncate">Search strategies, tickers, orders...</span>
              <kbd className="ml-auto shrink-0 rounded border border-white/10 bg-slate-800/60 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 select-none">
                ⌘K
              </kbd>
            </button>
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
            <NotificationPopover />
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}