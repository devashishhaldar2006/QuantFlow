import {
  LayoutDashboard,
  FlaskConical,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChartSpline,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  section: string;
  icon: LucideIcon;
};

export const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    section: "Overview",
    icon: LayoutDashboard,
  },
  {
    label: "Backtests",
    href: "/backtests",
    section: "Trading",
    icon: FlaskConical,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    section: "Trading",
    icon: BriefcaseBusiness,
  },
  {
    label: "Strategies",
    href: "/strategies",
    section: "Trading",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Analytics",
    href: "/analytics",
    section: "Analysis",
    icon: ChartSpline,
  },
];