"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const overviewItems = navigation.filter((item) => item.section === "Overview");
  const tradingItems = navigation.filter((item) => item.section === "Trading");
  const analysisItems = navigation.filter((item) => item.section === "Analysis");

  const sidebarContent = (
    <>
      {/* Brand (Moved to TopNavbar) */}
      <div className="pt-4" />

      {/* Navigation */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-2 pb-4 scrollbar-hide">
        <NavSection title="Overview" items={overviewItems} pathname={pathname} isCollapsed={isCollapsed} />
        <NavSection title="Trading" items={tradingItems} pathname={pathname} isCollapsed={isCollapsed} />
        <NavSection title="Analysis" items={analysisItems} pathname={pathname} isCollapsed={isCollapsed} />
      </nav>

      {/* Engine Status & Toggle */}
      <div className="border-t border-slate-700/50 p-3">
        {!isCollapsed ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium">Engine Online</span>
            </div>
            
            <div className="mt-2 border-t border-slate-700/30 pt-3">
              <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300">
                <div className="size-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium">
                  DH
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-xs font-medium text-slate-200">Devashish H.</p>
                  <p className="truncate text-[10px] text-slate-500">Free Tier</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="group relative flex size-9 items-center justify-center rounded-md text-emerald-500 hover:bg-slate-800 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
            
            <div className="w-6 border-t border-slate-700/30 my-1" />
            
            <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-300">
               DH
            </div>
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