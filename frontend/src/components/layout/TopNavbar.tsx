"use client";

import { HelpCircle, Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigation } from "../navigation/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TopNavbar() {
  const pathname = usePathname();

  const currentPage = navigation.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#283148] bg-[#0a1120]/95 px-4 backdrop-blur-md md:px-6">
      {/* Mobile spacer (hamburger lives in Sidebar) */}
      <div className="w-9 md:hidden" />

      {/* Desktop search */}
      <div className="hidden items-center gap-8 md:flex">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#7d8599]" />

          <input
            type="text"
            placeholder="Search strategies, tickers..."
            className="h-8 w-56 rounded-md border border-[#283148] bg-[#141d30] pl-8 pr-3 text-xs text-[#d8dfef] outline-none placeholder:text-[#7d8599] transition-all duration-200 focus:w-72 focus:border-[#7da2e0]/50 focus:ring-1 focus:ring-[#7da2e0]/30"
          />
        </div>
      </div>

      {/* Mobile page title */}
      <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
        <span className="text-sm font-medium text-[#d8dfef]">
          {currentPage?.label ?? "QuantFlow"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-8 items-center justify-center rounded-md text-[#7d8599] transition-colors hover:bg-[#1c2640] hover:text-[#d8dfef]"
        >
          <Bell className="size-3.5" />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="flex size-8 items-center justify-center rounded-md text-[#7d8599] transition-colors hover:bg-[#1c2640] hover:text-[#d8dfef]"
        >
          <HelpCircle className="size-3.5" />
        </button>

        <div className="mx-1 h-5 w-px bg-[#283148]" />

        <button
          type="button"
          className="hidden h-8 rounded-md bg-[#7da2e0] px-3.5 text-xs font-semibold text-[#0a1120] transition-all duration-200 hover:bg-[#9bb8e8] hover:shadow-lg hover:shadow-[#7da2e0]/10 sm:block"
        >
          New Backtest
        </button>

        <Avatar className="ml-1 size-8 rounded-md border border-[#283148]">
          <AvatarFallback className="rounded-md bg-[#1c2640] text-[10px] font-medium text-[#d8dfef]">
            DH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}