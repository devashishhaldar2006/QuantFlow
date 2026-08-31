"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser, useAuth, SignOutButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

import NavSection from "./NavSection";
import { navigation } from "./navigation";

/**
 * Sidebar — Main navigation sidebar for the QuantFlow terminal.
 *
 * Desktop: Fixed left sidebar, expandable via hover or button.
 * Mobile:  Slide-in overlay triggered by hamburger in TopNavbar.
 */

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
};

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
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

  // Do not render sidebar when logged out or on public landing/auth pages
  if (isPublicRoute && (!isLoaded || !isSignedIn)) {
    return null;
  }

  const overviewItems = navigation.filter((item) => item.section === "Overview");
  const tradingItems = navigation.filter((item) => item.section === "Trading");
  const analysisItems = navigation.filter((item) => item.section === "Analysis");
  const systemItems = navigation.filter((item) => item.section === "System");

  const displayName = user?.fullName || user?.username || "QuantFlow User";
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sidebarContent = (
    <>
      {/* Brand (Moved to TopNavbar) */}
      <div className="pt-4" />

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-2 pb-4 scrollbar-hide">
        <NavSection title="Overview" items={overviewItems} pathname={pathname} isCollapsed={isCollapsed} />
        <NavSection title="Trading" items={tradingItems} pathname={pathname} isCollapsed={isCollapsed} />
        <NavSection title="Analysis" items={analysisItems} pathname={pathname} isCollapsed={isCollapsed} />
        <NavSection title="System" items={systemItems} pathname={pathname} isCollapsed={isCollapsed} />
      </nav>

      {/* Engine Status & User Profile */}
      <div className="shrink-0 border-t border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-md">
        {!isCollapsed ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 bg-white/[0.02] border border-white/5">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-emerald-400">Engine Online</span>
            </div>

            <Link
              href="/profile"
              className="mt-1 flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={displayName}
                    className="size-8 shrink-0 rounded-full object-cover border border-indigo-500/30"
                  />
                ) : (
                  <div className="size-8 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {initials || "QF"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{displayName}</p>
                  <p className="truncate text-[10px] text-slate-400">{displayEmail || "View Profile"}</p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="group relative flex size-8 items-center justify-center rounded-lg text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
            </div>

            <div className="w-5 border-t border-white/10 my-0.5" />

            <Link href="/profile" title="View Profile">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="size-8 shrink-0 rounded-full object-cover border border-slate-600 hover:border-indigo-400 transition-colors"
                />
              ) : (
                <div className="size-8 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white hover:bg-indigo-500 transition-colors">
                  {initials || "QF"}
                </div>
              )}
            </Link>

            <SignOutButton redirectUrl="/sign-in">
              <button
                type="button"
                title="Sign Out"
                className="flex size-7 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="size-3.5" />
              </button>
            </SignOutButton>
          </div>
        )}
      </div>
      
      {/* Removed Collapse Toggle, now in TopNavbar */}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`fixed left-0 top-[60px] z-40 hidden h-[calc(100vh-60px)] flex-col border-r border-slate-800/80 bg-slate-900/50 backdrop-blur-md md:flex transition-all duration-200 ${
          isCollapsed ? "w-[64px]" : "w-[240px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Toggle (rendered by TopNavbar visually, but state managed here) */}
      <MobileToggle isOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-slate-700 bg-[#0F1520] md:hidden shadow-xl"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 flex size-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
                aria-label="Close sidebar"
              >
                <X className="size-4.5" />
              </button>

              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * MobileToggle — Hamburger button for mobile sidebar.
 */
function MobileToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed left-4 top-4 z-40 flex size-9 items-center justify-center rounded-md border border-slate-700 bg-slate-900/50 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 md:hidden"
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
    >
      <Menu className="size-4.5" />
    </button>
  );
}