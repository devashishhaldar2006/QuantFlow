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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#424754] bg-[#0b1326] px-4 md:px-6">
      {/* Mobile brand */}
      <div className="md:hidden">
        <h1 className="text-lg font-semibold text-[#adc6ff]">
          QuantFlow
        </h1>
      </div>

      {/* Desktop search */}
      <div className="hidden items-center gap-8 md:flex">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-[#8c909f]" />

          <input
            type="text"
            placeholder="Search strategies, tickers..."
            className="h-9 w-64 rounded border border-[#424754] bg-[#222a3d] pl-9 pr-3 text-xs text-[#dae2fd] outline-none placeholder:text-[#8c909f] transition-colors focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff]"
          />
        </div>
      </div>

      {/* Mobile page title */}
      <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
        <span className="text-sm font-medium text-[#dae2fd]">
          {currentPage?.label ?? "QuantFlow"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-8 items-center justify-center rounded text-[#c2c6d6] transition-colors hover:bg-[#2d3449] hover:text-[#adc6ff]"
        >
          <Bell className="size-4" />
        </button>

        <button
          type="button"
          aria-label="Help"
          className="flex size-8 items-center justify-center rounded text-[#c2c6d6] transition-colors hover:bg-[#2d3449] hover:text-[#adc6ff]"
        >
          <HelpCircle className="size-4" />
        </button>

        <button
          type="button"
          className="hidden h-9 rounded bg-[#adc6ff] px-4 text-xs font-semibold text-[#002e6a] transition-colors hover:bg-[#d8e2ff] sm:block"
        >
          Execute Trade
        </button>

        <Avatar className="ml-1 size-8 rounded border border-[#424754]">
          <AvatarFallback className="rounded bg-[#222a3d] text-[10px] text-[#dae2fd]">
            DH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}