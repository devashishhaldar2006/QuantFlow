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
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8c909f]">
        {title}
      </p>

      <div className="space-y-1">
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
                "flex h-9 items-center gap-3 rounded px-3",
                "text-sm transition-colors",
                isActive
                  ? "bg-[#3a4a5f]/30 font-semibold text-[#adc6ff]"
                  : "text-[#c2c6d6] hover:bg-[#2d3449] hover:text-[#dae2fd]",
              ].join(" ")}
            >
              <Icon
                className="size-4 shrink-0"
                strokeWidth={isActive ? 2.2 : 1.8}
              />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}