"use client";

import { useClerk } from "@clerk/nextjs";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CustomSignInForm() {
  const clerk = useClerk();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Social SSO authentication
  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_github") => {
    if (!clerk.client) return;
    try {
      await clerk.client.signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to initiate social login.");
      }
    }
  };

  // Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clerk.client) return;

    setError("");
    setIsLoading(true);

    try {
      const result = await clerk.client.signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await clerk.setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Further authentication factor required.");
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      if (clerkErr.errors && clerkErr.errors[0]?.message) {
        setError(clerkErr.errors[0].message);
      } else {
        setError("Invalid email address or password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md space-y-6 rounded-2xl border border-indigo-500/20 bg-[#090D18]/90 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.15)]"
    >
      {/* Top Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 size-40 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"
      />

      {/* Social OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => handleSocialAuth("oauth_github")}
          className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] py-3 px-4 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-600/15 hover:text-white shadow-sm"
        >
          <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => handleSocialAuth("oauth_google")}
          className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] py-3 px-4 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-600/15 hover:text-white shadow-sm"
        >
          <svg className="size-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.13C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24a7.18 7.18 0 0 1 0-4.48V6.63H1.29a11.97 11.97 0 0 0 0 10.74l3.99-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.63l3.99 3.13c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          Google
        </motion.button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-2">
        <div className="w-full border-t border-white/10" />
        <span className="absolute bg-[#090D18] px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          Or continue with email
        </span>
      </div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-400"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@quantflow.io"
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-600 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <span>Sign In to Terminal</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </form>

      {/* Switch to Sign Up */}
      <div className="text-center pt-3 border-t border-white/5">
        <p className="text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
