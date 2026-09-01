"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Trash2, ExternalLink, Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "backtest" | "sync" | "system" | "quota";
  read: boolean;
  link?: string;
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "C++ Quant Engine Online",
    message: "High-frequency native backtest daemon connected with zero latency.",
    timestamp: "Just now",
    type: "system",
    read: false,
    link: "/dashboard",
  },
  {
    id: "notif-2",
    title: "Market Data Platform Ready",
    message: "Live candle streaming enabled for Binance Crypto and Yahoo Finance.",
    timestamp: "10m ago",
    type: "sync",
    read: false,
    link: "/data",
  },
  {
    id: "notif-3",
    title: "Institutional Export Available",
    message: "Download PDF tear-sheets and full execution CSVs from any backtest.",
    timestamp: "1h ago",
    type: "backtest",
    read: true,
    link: "/backtests/results",
  },
];

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        if (data.notifications && data.notifications.length > 0) {
          setNotifications(data.notifications);
        } else {
          setNotifications(DEFAULT_NOTIFICATIONS);
        }
      }
    } catch {
      setNotifications(DEFAULT_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "readAll" }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const clearAll = async () => {
    setNotifications([]);
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clearAll" }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const markItemRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "readOne", id }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Bell */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex size-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/5 hover:text-slate-200"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <>
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-indigo-500 border border-slate-950" />
          </>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#090E1A]/95 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-400 border border-indigo-500/30">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
                  >
                    <Check className="size-3 text-emerald-400" />
                    Mark Read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    title="Clear All Notifications"
                    className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500 space-y-2">
                  <Activity className="size-6 text-slate-600" />
                  <p className="text-xs">No notifications right now.</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markItemRead(item.id)}
                    className={`group relative rounded-xl border p-3 transition-all ${
                      item.read
                        ? "border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
                        : "border-indigo-500/25 bg-indigo-500/[0.06] hover:bg-indigo-500/[0.1]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`size-1.5 rounded-full ${
                              item.read ? "bg-slate-600" : "bg-indigo-400"
                            }`}
                          />
                          <h4 className="text-xs font-semibold text-slate-200">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-slate-500">
                        {item.timestamp}
                      </span>
                    </div>

                    {item.link && (
                      <div className="mt-2 pt-2 border-t border-white/5 flex justify-end">
                        <Link
                          href={item.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          View Details
                          <ArrowUpRight className="size-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
