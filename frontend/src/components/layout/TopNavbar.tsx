"use client";

import { usePathname } from "next/navigation";
import { navigation } from "../navigation/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TopNavbar() {
  const pathname = usePathname();

  const currentPage = navigation.find((item) => item.href === pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div>
        <h1 className="text-sm font-medium">
          {currentPage?.label ?? "QuantFlow"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground"
        >
          Search
          <kbd className="rounded border px-1.5 py-0.5 text-xs">/</kbd>
        </button>

        <Avatar>
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
