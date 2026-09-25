"use client";

import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
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
    if (window.innerWidth < 768) {
      if (setMobileOpen) {
        setMobileOpen((prev) => !prev);
      }
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[48px] border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="flex h-full items-center px-3 sm:px-4 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleToggle}
            className="flex size-7 shrink-0 items-center justify-center border border-zinc-300 bg-white text-zinc-700 hover:text-black hover:border-black transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="size-3.5" />
          </button>

          <div className="flex shrink-0 items-center mr-2 sm:mr-3">
            <QuantFlowLogo className="size-5" textClassName="text-xs font-bold tracking-tight hidden sm:inline-block" />
          </div>

          <div className="flex-1 min-w-0 max-w-[320px]">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="relative group w-full flex items-center h-7 border border-zinc-200 bg-zinc-50 px-2 text-xs text-zinc-500 hover:border-zinc-400 hover:bg-white transition-colors text-left"
            >
              <Search className="size-3 text-zinc-400 mr-2 shrink-0 group-hover:text-black transition-colors" />
              <span className="truncate text-[10px] font-mono">SEARCH_INSTRUMENTS...</span>
              <kbd className="ml-auto shrink-0 border border-zinc-300 bg-white px-1 text-[8px] font-mono text-zinc-600 select-none">
                ⌘K
              </kbd>
            </button>
          </div>

          {currentPage && (
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 border border-zinc-200 bg-zinc-50 text-[10px] font-mono text-zinc-600">
              <span className="text-zinc-400">VIEW:</span>
              <span className="font-bold text-zinc-900">{currentPage.label.toUpperCase()}</span>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <NotificationPopover />
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}