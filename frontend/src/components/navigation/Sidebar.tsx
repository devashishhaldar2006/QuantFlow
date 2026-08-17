"use client";

import { usePathname } from "next/navigation";

import NavSection from "./NavSection";
import { navigation } from "./navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const overviewItems = navigation.filter(
    (item) => item.section === "Overview",
  );

  const tradingItems = navigation.filter(
    (item) => item.section === "Trading",
  );

  const analysisItems = navigation.filter(
    (item) => item.section === "Analysis",
  );

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-[#424754] bg-[#131b2e] md:flex">
      {/* Brand */}
      <div className="mb-4 border-b border-[#424754]/50 px-4 pb-6 pt-5">
        <h1 className="text-xl font-semibold tracking-tight text-[#adc6ff]">
          QuantFlow
        </h1>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c909f]">
          Institutional Terminal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-2">
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

      {/* Bottom */}
      <div className="border-t border-[#424754]/50 p-2">
        <div className="flex items-center gap-3 rounded px-3 py-2 text-sm text-[#c2c6d6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4edea3]" />

          <span>QuantFlow Engine</span>
        </div>
      </div>
    </aside>
  );
}