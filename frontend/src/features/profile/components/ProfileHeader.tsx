"use client";

import { useUser } from "@clerk/nextjs";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
} from "lucide-react";

type UserResource = NonNullable<ReturnType<typeof useUser>["user"]>;

type ProfileHeaderProps = {
  user: UserResource;
  displayName: string;
  primaryEmail: string;
  showManageModal: boolean;
  onToggleManageModal: () => void;
};

export default function ProfileHeader({
  user,
  displayName,
  primaryEmail,
  showManageModal,
  onToggleManageModal,
}: ProfileHeaderProps) {
  const createdAtFormatted = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
      <div className="absolute right-0 top-0 -mr-16 -mt-16 size-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="size-20 rounded-2xl border-2 border-indigo-500/30 object-cover shadow-xl"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-2xl border-2 border-indigo-500/30 bg-indigo-600 text-2xl font-bold text-white shadow-xl">
              {displayName.substring(0, 2).toUpperCase()}
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                {displayName}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="size-3.5" />
                Verified Trader
              </span>
            </div>

            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Mail className="size-3.5 text-slate-500" />
              {primaryEmail}
            </p>

            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Calendar className="size-3 text-slate-600" />
              Member since {createdAtFormatted}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleManageModal}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20 hover:text-white shadow-md"
          >
            <UserIcon className="size-4 text-indigo-400" />
            {showManageModal ? "Close Account Settings" : "Edit Account Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
