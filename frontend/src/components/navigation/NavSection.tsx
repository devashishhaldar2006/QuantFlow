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
    <section className="mb-6">
      {!isCollapsed && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
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
                  "group relative flex h-9 items-center rounded-md transition-all duration-300 ease-in-out overflow-hidden",
                  isCollapsed ? "w-9 px-0 justify-center mx-auto" : "w-full px-3",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200",
                ].join(" ")}
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-indigo-500/10 rounded-md" />
                )}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}

                <Icon
                  className={[
                    "size-4 shrink-0 transition-transform duration-300",
                    !isActive && "group-hover:text-slate-300",
                    isCollapsed ? "mx-auto" : "mr-3"
                  ].join(" ")}
                  strokeWidth={isActive ? 2 : 1.75}
                />

                <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
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
                  <TooltipContent side="right" className="bg-slate-800 border-slate-700 text-slate-200 font-medium">
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