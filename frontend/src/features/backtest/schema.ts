import { z } from "zod";

export const backtestConfigSchema = z
  .object({
    strategy: z.string().min(1, "Strategy is required"),

    symbol: z
      .string()
      .trim()
      .min(1, "Symbol is required"),

    timeframe: z.string().min(1, "Timeframe is required"),

    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .min(1, "End date is required"),

    initialCapital: z
      .number()
      .positive("Initial capital must be greater than zero"),
  })
  .refine(
    (data) => data.endDate > data.startDate,
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

  export type BacktestConfig = z.infer<typeof backtestConfigSchema>;