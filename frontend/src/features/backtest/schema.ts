import { z } from "zod";

export const backtestConfigSchema = z
  .object({
    strategy: z
      .string()
      .min(1, "Strategy is required"),

    csvFile: z
      .string()
      .trim()
      .min(1, "CSV file is required")
      .max(256, "CSV file path is too long")
      .refine((val) => !val.includes(".."), {
        message: "CSV file path must not contain '..'",
      })
      .refine((val) => !val.startsWith("/"), {
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
      .min(0, "Stop loss cannot be negative"),

    takeProfitPercent: z
      .number()
      .min(0, "Take profit cannot be negative"),

    shortMAPeriod: z
      .number()
      .int()
      .positive("Short MA period must be greater than zero"),

    longMAPeriod: z
      .number()
      .int()
      .positive("Long MA period must be greater than zero"),
  })
  .refine(
    (data) => data.shortMAPeriod < data.longMAPeriod,
    {
      message:
        "Short MA period must be less than long MA period",
      path: ["longMAPeriod"],
    }
  );

export type BacktestConfig =
  z.infer<typeof backtestConfigSchema>;