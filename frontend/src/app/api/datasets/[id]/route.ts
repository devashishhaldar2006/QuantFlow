import { getCurrentUser } from "@/services/auth/currentUser";
import { DatasetService } from "@/services/data/datasetService";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const dataset = await DatasetService.getDatasetById(id, user.id);

    if (!dataset) {
      return Response.json({ error: "Dataset not found" }, { status: 404 });
    }

    return Response.json({ dataset });
  } catch (error) {
    console.error("GET /api/datasets/[id] error:", error);
    return Response.json({ error: "Failed to fetch dataset" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const success = await DatasetService.deleteDataset(id, user.id);

    if (!success) {
      return Response.json({ error: "Failed to delete dataset or dataset not found" }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/datasets/[id] error:", error);
    return Response.json({ error: "Failed to delete dataset" }, { status: 500 });
  }
}
