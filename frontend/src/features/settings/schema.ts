import { z } from "zod";

export const engineConfigSchema = z
  .object({
    strategy: z.string().min(1, "Strategy is required").max(64),
    csvFile: z
      .string()
      .min(1, "CSV file path is required")
      .max(256)
      .refine((v) => !v.includes(".."), "Path traversal ('..') not allowed")
      .refine((v) => !v.startsWith("/"), "Must be a relative path"),
    initialCash: z.number().positive("Initial capital must be greater than zero"),
    commission: z.number().min(0, "Commission cannot be negative"),
    stopLossPercent: z.number().min(0).max(1, "Stop loss must be between 0 and 1"),
    takeProfitPercent: z.number().min(0).max(1, "Take profit must be between 0 and 1"),
    slippage: z.number().min(0, "Slippage cannot be negative"),
    shortMAPeriod: z.number().int().positive(),
    longMAPeriod: z.number().int().positive(),
    rsiPeriod: z.number().int().positive(),
    oversold: z.number().min(0).max(100),
    overbought: z.number().min(0).max(100),
    fastEMAPeriod: z.number().int().positive(),
    slowEMAPeriod: z.number().int().positive(),
    macdFastPeriod: z.number().int().positive(),
    macdSlowPeriod: z.number().int().positive(),
    macdSignalPeriod: z.number().int().positive(),
    bollingerPeriod: z.number().int().positive(),
    bollingerMultiplier: z.number().positive(),
    atrPeriod: z.number().int().positive(),
    minimumATR: z.number().min(0),
  })
  .refine((data) => data.shortMAPeriod < data.longMAPeriod, {
    message: "Short MA period must be less than long MA period",
    path: ["longMAPeriod"],
  })
  .refine((data) => data.fastEMAPeriod < data.slowEMAPeriod, {
    message: "Fast EMA period must be less than slow EMA period",
    path: ["slowEMAPeriod"],
  })
  .refine((data) => data.macdFastPeriod < data.macdSlowPeriod, {
    message: "Fast MACD period must be less than slow MACD period",
    path: ["macdSlowPeriod"],
  })
  .refine((data) => data.oversold < data.overbought, {
    message: "Oversold threshold must be less than overbought threshold",
    path: ["overbought"],
  });
