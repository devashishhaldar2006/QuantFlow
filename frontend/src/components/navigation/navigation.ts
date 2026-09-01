import {
  LayoutDashboard,
  FlaskConical,
  ChartNoAxesCombined,
  ChartSpline,
  Folder,
  Settings,
  CreditCard,
  User,
  Info,
  Database,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  section: string;
  icon: LucideIcon;
  shortcut?: string;
};

export const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    section: "Overview",
    icon: LayoutDashboard,
    shortcut: "⌘D",
  },
  {
    label: "Backtests",
    href: "/backtests",
    section: "Trading",
    icon: FlaskConical,
    shortcut: "⌘B",
  },
  {
    label: "Data",
    href: "/data",
    section: "Trading",
    icon: Database,
    shortcut: "⌘E",
  },
  {
    label: "Strategies",
    href: "/strategies",
    section: "Trading",
    icon: ChartNoAxesCombined,
    shortcut: "⌘S",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    section: "Overview",
    icon: Folder,
  },
  {
    label: "Analytics",
    href: "/analytics",
    section: "Analysis",
    icon: ChartSpline,
  },
  {
    label: "Profile",
    href: "/profile",
    section: "System",
    icon: User,
    shortcut: "⌘P",
  },
  {
    label: "Settings",
    href: "/settings",
    section: "System",
    icon: Settings,
  },
  {
    label: "Billing",
    href: "/billing",
    section: "System",
    icon: CreditCard,
  },
  {
    label: "About Developer",
    href: "/about",
    section: "System",
    icon: Info,
  },
];