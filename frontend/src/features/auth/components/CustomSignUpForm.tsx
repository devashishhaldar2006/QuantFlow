"use client";

import { useClerk, useAuth, useSignUp } from "@clerk/nextjs";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function CustomSignUpForm() {
  const clerk = useClerk();
  const { signUp } = useSignUp();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [authLoaded, isSignedIn, router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Social SSO
  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_github") => {
    setError("");
    try {
      if (signUp) {
        const res = await signUp.sso({
          strategy,
          redirectUrl: "/dashboard",
          redirectCallbackUrl: "/sso-callback",
        });
        if (res?.error) {
          setError(res.error.message || "Failed to initiate social login.");
        }
      }
    } catch (err: unknown) {
      console.error("[SSO Error]:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to initiate social login.");
      }
    }
  };

  // Sign Up Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clerk.client) return;

    setError("");
    setIsLoading(true);

    try {
      await clerk.client.signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ").slice(1).join(" ") || "",
      });

      await clerk.client.signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      if (clerkErr.errors && clerkErr.errors[0]?.message) {
        setError(clerkErr.errors[0].message);
      } else {
        setError("Failed to create account. Please check your inputs.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Email Verification
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!clerk.client) return;

    setError("");
    setIsLoading(true);

    try {
      const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await clerk.setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      if (clerkErr.errors && clerkErr.errors[0]?.message) {
        setError(clerkErr.errors[0].message);
      } else {
        setError("Invalid verification code. Please check your email.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="w-full max-w-md space-y-6 rounded-md border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-1">
            <Mail className="size-5" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-950">Verify your email</h2>
          <p className="text-xs text-zinc-500">
            We sent a 6-digit confirmation code to <strong className="text-zinc-800">{email}</strong>
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Verification Code
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full text-center font-mono text-lg tracking-widest rounded border border-zinc-300 bg-white py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded bg-zinc-950 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                <span>Verify & Enter Terminal</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-md border border-zinc-200 bg-white p-8 shadow-sm">
      {/* Social OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialAuth("oauth_github")}
          className="flex items-center justify-center gap-2 rounded border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-xs font-medium text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
        >
          <svg className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>

        <button
          type="button"
          onClick={() => handleSocialAuth("oauth_google")}
          className="flex items-center justify-center gap-2 rounded border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-xs font-medium text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
        >
          <svg className="size-4" viewBox="0 0 24 24">
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
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-1">
        <div className="w-full border-t border-zinc-200" />
        <span className="absolute bg-white px-2.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
          Or register with email
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@quantflow.io"
              className="w-full rounded border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-zinc-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded border border-zinc-300 bg-white py-2 pl-9 pr-9 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded bg-zinc-950 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="size-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Sign In */}
      <div className="text-center pt-2 border-t border-zinc-100">
        <p className="text-xs text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-zinc-950 underline underline-offset-2"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
