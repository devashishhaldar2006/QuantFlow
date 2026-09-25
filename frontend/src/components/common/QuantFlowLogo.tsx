import React from "react";
import Image from "next/image";

export function QuantFlowLogo({
  className = "size-6",
  withText = true,
  textClassName = "text-base font-semibold tracking-tight",
}: {
  className?: string;
  withText?: boolean;
  textClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 select-none shrink-0 group">
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/logo.svg"
          alt="QuantFlow Logo"
          width={28}
          height={28}
          priority
          className="size-full transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {withText && (
        <span className={`text-zinc-950 font-sans tracking-tight font-semibold flex items-center ${textClassName}`}>
          Quant<span className="font-normal text-zinc-500">Flow</span>
        </span>
      )}
    </div>
  );
}
