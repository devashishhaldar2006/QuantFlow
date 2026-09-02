import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-slate-100">
      <div className="text-center space-y-3">
        <div className="size-8 mx-auto border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Authenticating with QuantFlow Terminal…</p>
      </div>
      <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/dashboard" signInForceRedirectUrl="/dashboard" />
    </div>
  );
}
