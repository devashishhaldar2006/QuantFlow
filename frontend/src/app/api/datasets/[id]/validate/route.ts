import { getCurrentUser } from "@/services/auth/currentUser";
import { ValidationService } from "@/services/data/validationService";
import { readFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { columnMap, rawText, filePath } = body;

    let csvContent = rawText;

    if (!csvContent && filePath) {
      // Validate that filePath is safe and does not traverse parent directories
      if (typeof filePath !== "string" || filePath.includes("..") || filePath.startsWith("/") || filePath.startsWith("\\")) {
        return Response.json({ error: "Invalid or unauthorized file path." }, { status: 400 });
      }

      const fullPath = join(process.cwd(), "..", "backend", filePath);
      try {
        csvContent = await readFile(fullPath, "utf-8");
      } catch {
        return Response.json({ error: "Dataset file not found or inaccessible." }, { status: 404 });
      }
    }

    if (!csvContent) {
      return Response.json({ error: "No CSV content provided for validation." }, { status: 400 });
    }

    const mapToUse = columnMap || {
      timestamp: "date",
      open: "open",
      high: "high",
      low: "low",
      close: "close",
      volume: "volume",
    };

    const report = ValidationService.validateCSVData(csvContent, mapToUse);

    return Response.json({ report });
  } catch (error) {
    console.error("POST /api/datasets/[id]/validate error:", error);
    return Response.json({ error: "Failed to validate dataset" }, { status: 500 });
  }
}
