import { getCurrentUser } from "@/services/auth/currentUser";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";

const CONFIG_PATH = join(
  process.cwd(),
  "..",
  "backend",
  "config",
  "config.json",
);

const engineConfigSchema = z.object({
  strategy: z.string().min(1).max(64),
  csvFile: z
    .string()
    .min(1)
    .max(256)
    .refine((v) => !v.includes(".."), "Path traversal not allowed")
    .refine((v) => !v.startsWith("/"), "Must be a relative path"),
  initialCash: z.number().positive(),
  commission: z.number().min(0),
  stopLossPercent: z.number().min(0).max(1),
  takeProfitPercent: z.number().min(0).max(1),
  slippage: z.number().min(0),
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
});

async function readConfig() {
  try {
    const raw = await readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** GET /api/settings/engine-config — returns current config.json */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await readConfig();
  if (!config) {
    return Response.json(
      { error: "Could not read engine config file." },
      { status: 503 },
    );
  }

  return Response.json(config);
}

/** POST /api/settings/engine-config — validates and writes config.json */
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = engineConfigSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.issues[0].message },
      { status: 400 },
    );
  }

  const data = result.data;

  // Cross-field validation — mirrors the C++ RequestValidator logic
  if (data.shortMAPeriod >= data.longMAPeriod) {
    return Response.json(
      { error: "shortMAPeriod must be less than longMAPeriod" },
      { status: 400 },
    );
  }
  if (data.fastEMAPeriod >= data.slowEMAPeriod) {
    return Response.json(
      { error: "fastEMAPeriod must be less than slowEMAPeriod" },
      { status: 400 },
    );
  }
  if (data.macdFastPeriod >= data.macdSlowPeriod) {
    return Response.json(
      { error: "macdFastPeriod must be less than macdSlowPeriod" },
      { status: 400 },
    );
  }
  if (data.oversold >= data.overbought) {
    return Response.json(
      { error: "oversold must be less than overbought" },
      { status: 400 },
    );
  }

  try {
    await writeFile(CONFIG_PATH, JSON.stringify(data, null, 4), "utf-8");
  } catch (err) {
    console.error("Failed to write engine config:", err);
    return Response.json(
      { error: "Failed to write config file. Check server file permissions." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
