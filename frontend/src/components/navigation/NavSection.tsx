import Link from "next/link";

import type { NavItem } from "./navigation";

type NavSectionProps = {
  title: string;
  items: NavItem[];
  pathname: string;
};

export default function NavSection({
  title,
  items,
  pathname,
}: NavSectionProps) {
  return (
    <section>
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7d8599]">
        {title}
      </p>

      <div className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex h-9 items-center gap-3 rounded-md px-3",
                "text-sm transition-all duration-200",
                isActive
                  ? "bg-[#7da2e0]/10 font-semibold text-[#7da2e0]"
                  : "text-[#8b91a3] hover:bg-[#1c2640] hover:text-[#d8dfef]",
              ].join(" ")}
            >
              <Icon
                className={[
                  "size-4 shrink-0 transition-transform duration-200",
                  isActive
                    ? ""
                    : "group-hover:scale-110",
                ].join(" ")}
                strokeWidth={isActive ? 2.2 : 1.8}
              />

              <span>{item.label}</span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#7da2e0]" />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}