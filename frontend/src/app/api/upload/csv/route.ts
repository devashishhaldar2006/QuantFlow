import { getCurrentUser } from "@/services/auth/currentUser";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ["text/csv", "text/plain", "application/csv", "application/vnd.ms-excel"];
const UPLOAD_DIR = join(process.cwd(), "..", "backend", "data", "uploads");

/**
 * POST /api/upload/csv
 * Accepts a multipart/form-data request with a CSV file field named "file".
 * Validates the file, saves it to the backend data/uploads directory,
 * and returns the relative path that can be used in BacktestConfig.csvFile.
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return Response.json(
        { error: "Request must be multipart/form-data" },
        { status: 415 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // ── File size check ──────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return Response.json(
        { error: "File too large. Maximum size is 10 MB." },
        { status: 413 },
      );
    }

    if (file.size === 0) {
      return Response.json({ error: "File is empty." }, { status: 400 });
    }

    // ── MIME type check ──────────────────────────────────────────────────
    const mimeType = file.type || "text/csv";
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      return Response.json(
        { error: "Only CSV files are allowed." },
        { status: 400 },
      );
    }

    // ── File name sanitisation ───────────────────────────────────────────
    const rawName = file.name;

    if (!rawName.toLowerCase().endsWith(".csv")) {
      return Response.json(
        { error: "File must have a .csv extension." },
        { status: 400 },
      );
    }

    // Strip path separators and traversal sequences from filename
    const safeName = rawName
      .replace(/[^a-zA-Z0-9_\-. ]/g, "_")
      .replace(/\.\./g, "_")
      .replace(/\//g, "_")
      .replace(/\\/g, "_")
      .substring(0, 128);

    if (!safeName || safeName === ".csv") {
      return Response.json({ error: "Invalid file name." }, { status: 400 });
    }

    // ── Unique filename to avoid collisions ──────────────────────────────
    const timestamp = Date.now();
    const uniqueName = `${timestamp}_${safeName}`;

    // ── Validate CSV content (must have at least a header row) ───────────
    const buffer = await file.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buffer);
    const lines = text.split("\n").filter((l) => l.trim().length > 0);

    if (lines.length < 2) {
      return Response.json(
        { error: "CSV must contain a header row and at least one data row." },
        { status: 400 },
      );
    }

    // Basic header check: must contain date/open/high/low/close (case-insensitive)
    const header = lines[0].toLowerCase();
    const requiredColumns = ["date", "open", "high", "low", "close"];
    const missingColumns = requiredColumns.filter((col) => !header.includes(col));

    if (missingColumns.length > 0) {
      return Response.json(
        {
          error: `CSV is missing required columns: ${missingColumns.join(", ")}. Expected headers: date,open,high,low,close[,volume]`,
        },
        { status: 400 },
      );
    }

    // ── Save file ────────────────────────────────────────────────────────
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const destPath = join(UPLOAD_DIR, uniqueName);
    await writeFile(destPath, Buffer.from(buffer));

    // Return relative path from backend working directory
    const relativePath = `data/uploads/${uniqueName}`;

    return Response.json(
      {
        path: relativePath,
        originalName: rawName,
        size: file.size,
        rows: lines.length - 1,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CSV upload failed:", error);

    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "CSV upload failed",
      },
      { status: 500 },
    );
  }
}
