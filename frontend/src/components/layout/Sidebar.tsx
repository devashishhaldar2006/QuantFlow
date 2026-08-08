"use client";

import { usePathname } from "next/navigation";
import NavSection from "./NavSection";
import { navigation } from "./navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const overviewItems = navigation.filter(
    (item) => item.section === "Overview",
  );

  const tradingItems = navigation.filter((item) => item.section === "Trading");

  const analysisItems = navigation.filter(
    (item) => item.section === "Analysis",
  );

  return (
    <aside className="min-h-screen w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-5">
        <span className="text-lg font-semibold tracking-tight">QuantFlow</span>
      </div>

      <nav className="space-y-6 px-3 py-5">
        <NavSection
          title="Overview"
          items={overviewItems}
          pathname={pathname}
        />

        <NavSection title="Trading" items={tradingItems} pathname={pathname} />

        <NavSection
          title="Analysis"
          items={analysisItems}
          pathname={pathname}
        />
      </nav>
    </aside>
  );
}
