import React from "react";

export function QuantFlowLogo({ className = "size-7", withText = true, textClassName = "text-base font-extrabold" }: { className?: string; withText?: boolean; textClassName?: string }) {
  return (
    <div className="flex items-center gap-2.5 select-none shrink-0 group">
      <div className={`relative flex items-center justify-center rounded-xl bg-[#090E1A] border border-blue-500/30 p-1 shadow-sm transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-blue-500/10 ${className}`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="qf_logo_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M14 26 L19 21 L24 25 L34 15" stroke="url(#qf_logo_grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="15" r="2.5" fill="#38BDF8" />
          <rect x="13" y="30" width="4" height="6" rx="1.5" fill="#1E40AF" />
          <rect x="20" y="27" width="4" height="9" rx="1.5" fill="#2563EB" />
          <rect x="27" y="23" width="4" height="13" rx="1.5" fill="#3B82F6" />
          <rect x="34" y="19" width="4" height="17" rx="1.5" fill="#60A5FA" />
        </svg>
      </div>

      {withText && (
        <span className={`tracking-tight text-white font-sans ${textClassName}`}>
          Quant<span className="text-blue-400">Flow</span>
        </span>
      )}
    </div>
  );
}
