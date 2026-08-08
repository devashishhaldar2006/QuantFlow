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
    <div>
      <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-2.5 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <Icon className="mr-2.5 size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
