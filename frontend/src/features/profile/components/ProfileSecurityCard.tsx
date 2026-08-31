"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Shield, Key, Sparkles, Zap, LogOut } from "lucide-react";

export default function ProfileSecurityCard() {
  return (
    <div className="glass-panel h-full rounded-2xl p-6 border border-white/10 space-y-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Shield className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Security & Credentials</h3>
            <p className="text-xs text-slate-500">Session & Auth Health</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Key className="size-4 text-emerald-400" />
              <span>2FA / Passkey Status</span>
            </div>
            <span className="font-semibold text-emerald-400">Active</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="size-4 text-indigo-400" />
              <span>Authentication Method</span>
            </div>
            <span className="font-mono text-slate-400">Clerk Auth</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="size-4 text-amber-400" />
              <span>C++ Engine Integration</span>
            </div>
            <span className="font-semibold text-emerald-400">Connected</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10">
        <SignOutButton redirectUrl="/sign-in">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="size-4" />
            Sign Out of Session
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
