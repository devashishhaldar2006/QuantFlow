import Link from "next/link";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { NavItem } from "./navigation";

type NavSectionProps = {
  title: string;
  items: NavItem[];
  pathname: string;
  isCollapsed: boolean;
  onNavigate?: () => void;
};

export default function NavSection({
  title,
  items,
  pathname,
  isCollapsed,
  onNavigate,
}: NavSectionProps) {
  return (
    <section className="mb-5">
      {!isCollapsed && (
        <p className="mb-1.5 px-3 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
          {title}
        </p>
      )}

      <div className="space-y-0.5">
        <TooltipProvider delay={100}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            const linkContent = (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={[
                  "group relative flex h-8 items-center rounded text-xs transition-colors duration-150 overflow-hidden",
                  isCollapsed ? "w-8 px-0 justify-center mx-auto" : "w-full px-2.5",
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950",
                ].join(" ")}
              >
                {isActive && !isCollapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-r bg-zinc-950" />
                )}

                <Icon
                  className={[
                    "size-3.5 shrink-0 transition-colors",
                    isActive ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-950",
                    isCollapsed ? "mx-auto" : "mr-2.5"
                  ].join(" ")}
                />

                <span className={`whitespace-nowrap transition-all duration-200 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                  {item.label}
                </span>
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-zinc-950 text-white border-zinc-900 text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{linkContent}</div>;
          })}
        </TooltipProvider>
      </div>
    </section>
  );
}