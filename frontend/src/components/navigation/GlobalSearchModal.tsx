"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Database,
  FlaskConical,
  LineChart,
  PieChart,
  User,
  Settings,
  Cpu,
  Plus,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { SYSTEM_DATASET_LIBRARY } from "@/features/data/constants";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: "Navigation" | "Strategies" | "Datasets" | "Actions";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  shortcut?: string;
}

const SEARCH_ITEMS: SearchResultItem[] = [
  // Navigation
  {
    id: "nav-dashboard",
    title: "Dashboard",
    description: "Overview of backtest metrics and performance summary",
    category: "Navigation",
    href: "/dashboard",
    icon: LayoutDashboard,
    shortcut: "⌘D",
  },
  {
    id: "nav-data",
    title: "Market Data Platform",
    description: "Ingest, validate, and manage market datasets",
    category: "Navigation",
    href: "/data",
    icon: Database,
    shortcut: "⌘E",
  },
  {
    id: "nav-backtests",
    title: "Backtests Library",
    description: "View historical backtest runs and performance logs",
    category: "Navigation",
    href: "/backtests",
    icon: FlaskConical,
    shortcut: "⌘B",
  },
  {
    id: "nav-strategies",
    title: "Trading Strategies",
    description: "Explore algorithmic trading models and parameter rules",
    category: "Navigation",
    href: "/strategies",
    icon: Cpu,
    shortcut: "⌘S",
  },
  {
    id: "nav-analytics",
    title: "Analytics & Risk",
    description: "Deep dive equity curves, drawdowns, and Sharpe ratios",
    category: "Navigation",
    href: "/analytics",
    icon: LineChart,
    shortcut: "⌘A",
  },
  {
    id: "nav-portfolio",
    title: "Portfolio & Allocation",
    description: "Capital allocation breakdown and strategy weights",
    category: "Navigation",
    href: "/portfolio",
    icon: PieChart,
    shortcut: "⌘P",
  },
  {
    id: "nav-settings",
    title: "System Settings",
    description: "Configure engine connection, risk defaults, and API keys",
    category: "Navigation",
    href: "/settings",
    icon: Settings,
    shortcut: "⌘G",
  },
  {
    id: "nav-profile",
    title: "User Profile & Security",
    description: "Manage account settings and session security",
    category: "Navigation",
    href: "/profile",
    icon: User,
  },

  // Actions
  {
    id: "act-new-backtest",
    title: "Run New Backtest",
    description: "Configure parameters and run a backtest model",
    category: "Actions",
    href: "/backtests/new",
    icon: Plus,
    badge: "Action",
  },
  {
    id: "act-import-csv",
    title: "Import CSV Dataset",
    description: "Upload custom historical OHLCV data into the platform",
    category: "Actions",
    href: "/data",
    icon: Database,
    badge: "Action",
  },

  // Strategies
  {
    id: "strat-ma-cross",
    title: "Moving Average Crossover",
    description: "Dual moving average crossover trend strategy",
    category: "Strategies",
    href: "/backtests/new",
    icon: Cpu,
    badge: "Strategy",
  },
  {
    id: "strat-rsi",
    title: "RSI Mean Reversion",
    description: "Overbought / oversold technical indicator strategy",
    category: "Strategies",
    href: "/backtests/new",
    icon: Cpu,
    badge: "Strategy",
  },
  {
    id: "strat-macd",
    title: "MACD Momentum Signal",
    description: "Fast/slow moving average convergence divergence",
    category: "Strategies",
    href: "/backtests/new",
    icon: Cpu,
    badge: "Strategy",
  },
  {
    id: "strat-bollinger",
    title: "Bollinger Bands Volatility",
    description: "Standard deviation band breakout model",
    category: "Strategies",
    href: "/backtests/new",
    icon: Cpu,
    badge: "Strategy",
  },

  // Datasets from SYSTEM_DATASET_LIBRARY
  ...SYSTEM_DATASET_LIBRARY.map((dataset) => ({
    id: `ds-${dataset.id}`,
    title: dataset.name,
    description: `${dataset.symbol} • ${dataset.assetClass} • ${dataset.rowCount.toLocaleString()} candles`,
    category: "Datasets" as const,
    href: `/backtests/new?datasetId=${dataset.id}`,
    icon: Sparkles,
    badge: dataset.assetClass,
  })),
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS;

    return SEARCH_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view smoothly
  useEffect(() => {
    const activeEl = itemRefs.current.get(selectedIndex);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelectItem = (item: SearchResultItem) => {
    onClose();
    router.push(item.href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  const categories = ["Navigation", "Actions", "Strategies", "Datasets"] as const;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-indigo-500/10 overflow-hidden z-10 flex flex-col max-h-[75vh] animate-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="relative flex items-center px-4 border-b border-slate-800/80 bg-slate-950/60">
          <Search className="w-4 h-4 text-indigo-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, strategy, or dataset..."
            className="w-full h-14 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none font-mono"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-800 bg-slate-900 text-[10px] font-mono text-slate-400 select-none shrink-0">
            ESC
          </kbd>
        </div>

        {/* Search Results Container */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-4 divide-y divide-slate-800/40">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Command className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No results found</p>
              <p className="text-xs text-slate-500">
                No commands, strategies, or datasets match &quot;{query}&quot;
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const catItems = filteredItems.filter((item) => item.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="pt-2 first:pt-0">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {cat}
                  </div>
                  <div className="space-y-1 mt-1">
                    {catItems.map((item) => {
                      const itemGlobalIndex = filteredItems.findIndex((i) => i.id === item.id);
                      const isSelected = itemGlobalIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.id}
                          ref={(el) => {
                            if (el) itemRefs.current.set(itemGlobalIndex, el);
                            else itemRefs.current.delete(itemGlobalIndex);
                          }}
                          onClick={() => handleSelectItem(item)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? "bg-indigo-600/20 border border-indigo-500/40 text-slate-100"
                              : "hover:bg-slate-800/40 text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-lg shrink-0 ${
                                isSelected
                                  ? "bg-indigo-500 text-white"
                                  : "bg-slate-800/80 text-slate-400"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold tracking-tight truncate">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 truncate">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            {item.shortcut ? (
                              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] font-mono text-slate-400">
                                {item.shortcut}
                              </kbd>
                            ) : (
                              <ArrowRight
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isSelected ? "text-indigo-400 translate-x-0.5" : "opacity-0"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 py-2.5 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 rounded border border-slate-800 bg-slate-900 text-[9px]">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 rounded border border-slate-800 bg-slate-900 text-[9px]">↵</kbd> select
            </span>
          </div>
          <span>QuantFlow Terminal Command Palette</span>
        </div>
      </div>
    </div>
  );
}
