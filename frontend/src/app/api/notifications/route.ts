import { getCurrentUser } from "@/services/auth/currentUser";
import { NotificationService } from "@/services/notifications/notificationService";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ notifications: [] });
    }

    const notifications = await NotificationService.getUserNotifications(user.id);
    return Response.json({ notifications });
  } catch (err) {
    console.error("GET /api/notifications error:", err);
    return Response.json({ notifications: [] });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, action } = body as { id?: string; action?: "readAll" | "readOne" | "clearAll" };

    if (action === "readAll") {
      await NotificationService.markAllAsRead(user.id);
    } else if (action === "readOne" && id) {
      await NotificationService.markAsRead(id, user.id);
    } else if (action === "clearAll") {
      await NotificationService.clearAll(user.id);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/notifications error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
