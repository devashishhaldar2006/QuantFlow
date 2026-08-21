import { z } from "zod";

export const backtestConfigSchema = z
  .object({
    strategy: z.string().min(1, "Strategy is required"),

    csvFile: z
      .string()
      .trim()
      .min(1, "CSV file is required")
      .max(256, "CSV file path is too long")
      .refine((value) => !value.includes(".."), {
        message: "CSV file path must not contain '..'",
      })
      .refine((value) => !value.startsWith("/"), {
        message: "CSV file must be a relative path",
      }),

    initialCash: z
      .number()
      .positive("Initial capital must be greater than zero"),

    commission: z
      .number()
      .min(0, "Commission cannot be negative"),

    stopLossPercent: z
      .number()
      .min(0, "Stop loss cannot be negative")
      .max(1, "Stop loss must be between 0 and 1"),

    takeProfitPercent: z
      .number()
      .min(0, "Take profit cannot be negative")
      .max(1, "Take profit must be between 0 and 1"),

    shortMAPeriod: z
      .number()
      .int()
      .positive(),

    longMAPeriod: z
      .number()
      .int()
      .positive(),

    rsiPeriod: z
      .number()
      .int()
      .positive(),

    oversold: z
      .number()
      .min(0)
      .max(100),

    overbought: z
      .number()
      .min(0)
      .max(100),

    fastEMAPeriod: z
      .number()
      .int()
      .positive(),

    slowEMAPeriod: z
      .number()
      .int()
      .positive(),

    macdFastPeriod: z
      .number()
      .int()
      .positive(),

    macdSlowPeriod: z
      .number()
      .int()
      .positive(),

    macdSignalPeriod: z
      .number()
      .int()
      .positive(),

    bollingerPeriod: z
      .number()
      .int()
      .positive(),

    bollingerMultiplier: z
      .number()
      .positive(),

    atrPeriod: z
      .number()
      .int()
      .positive(),

    minimumATR: z
      .number()
      .min(0),
  })
  .refine(
    (data) => data.shortMAPeriod < data.longMAPeriod,
    {
      message:
        "Short MA period must be less than long MA period",
      path: ["longMAPeriod"],
    },
  )
  .refine(
    (data) => data.fastEMAPeriod < data.slowEMAPeriod,
    {
      message:
        "Fast EMA period must be less than slow EMA period",
      path: ["slowEMAPeriod"],
    },
  )
  .refine(
    (data) => data.macdFastPeriod < data.macdSlowPeriod,
    {
      message:
        "Fast MACD period must be less than slow MACD period",
      path: ["macdSlowPeriod"],
    },
  )
  .refine(
    (data) => data.oversold < data.overbought,
    {
      message:
        "Oversold must be less than overbought",
      path: ["overbought"],
    },
  );

export type BacktestConfig = z.infer<
  typeof backtestConfigSchema
>;