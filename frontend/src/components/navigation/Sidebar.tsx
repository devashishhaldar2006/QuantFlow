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
 * Desktop: Fixed left sidebar, always visible.
 * Mobile:  Slide-in overlay triggered by hamburger in TopNavbar.
 */

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const overviewItems = navigation.filter(
    (item) => item.section === "Overview",
  );

  const tradingItems = navigation.filter(
    (item) => item.section === "Trading",
  );

  const analysisItems = navigation.filter(
    (item) => item.section === "Analysis",
  );

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="mb-5 border-b border-[#283148]/60 px-4 pb-5 pt-5">
        <h1 className="text-xl font-semibold tracking-tight text-[#7da2e0]">
          QuantFlow
        </h1>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d8599]">
          Quantitative Terminal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2">
        <NavSection
          title="Overview"
          items={overviewItems}
          pathname={pathname}
        />

        <NavSection
          title="Trading"
          items={tradingItems}
          pathname={pathname}
        />

        <NavSection
          title="Analysis"
          items={analysisItems}
          pathname={pathname}
        />
      </nav>

      {/* Engine Status */}
      <div className="border-t border-[#283148]/60 p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#7d8599]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#56c79d] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#56c79d]" />
          </span>

          <span className="text-xs">Engine Online</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-[#283148] bg-[#0f1729] md:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Toggle (rendered by TopNavbar, but state managed here via export) */}
      <MobileToggle
        isOpen={mobileOpen}
        onToggle={() => setMobileOpen(!mobileOpen)}
      />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col border-r border-[#283148] bg-[#0f1729] md:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-4 flex size-8 items-center justify-center rounded-md text-[#7d8599] transition-colors hover:bg-[#1c2640] hover:text-[#d8dfef]"
                aria-label="Close sidebar"
              >
                <X className="size-4" />
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
 * Rendered inside the sidebar component but visually positioned
 * in the top-left on mobile screens.
 */
function MobileToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed left-4 top-4 z-40 flex size-9 items-center justify-center rounded-md border border-[#283148] bg-[#0f1729] text-[#7d8599] transition-colors hover:bg-[#1c2640] hover:text-[#d8dfef] md:hidden"
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
    >
      <Menu className="size-4" />
    </button>
  );
}