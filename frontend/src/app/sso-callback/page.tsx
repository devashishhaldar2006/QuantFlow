import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-slate-100">
      <div className="text-center space-y-3">
        <div className="size-8 mx-auto border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-zinc-600">AUTHENTICATING_TERMINAL_SESSION…</p>
      </div>
      <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/dashboard" signInForceRedirectUrl="/dashboard" />
    </div>
  );
}
