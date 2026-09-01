import { getCurrentUser } from "@/services/auth/currentUser";
import { DatasetService } from "@/services/data/datasetService";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const datasets = await DatasetService.getUserDatasets(user.id);
    return Response.json({ datasets });
  } catch (error) {
    console.error("GET /api/datasets error:", error);
    return Response.json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, symbol, assetClass, timeframe, filePath, fileSize, rowCount, startDate, endDate, version, columnMap, validation } = body;

    if (!name || !symbol || !filePath) {
      return Response.json({ error: "Missing required fields (name, symbol, filePath)" }, { status: 400 });
    }

    // Reject path traversal attempts
    if (typeof filePath !== "string" || filePath.includes("..") || filePath.startsWith("/") || filePath.startsWith("\\")) {
      return Response.json({ error: "Invalid file path format" }, { status: 400 });
    }

    const dataset = await DatasetService.createDataset(user.id, {
      name,
      symbol,
      assetClass: assetClass || "EQUITY",
      timeframe: timeframe || "1d",
      filePath,
      fileSize: fileSize || 0,
      rowCount: rowCount || 0,
      startDate,
      endDate,
      version: version || "v1.0.0",
      columnMap,
      validation,
    });

    return Response.json({ dataset }, { status: 201 });
  } catch (error) {
    console.error("POST /api/datasets error:", error);
    return Response.json({ error: "Failed to create dataset" }, { status: 500 });
  }
}
