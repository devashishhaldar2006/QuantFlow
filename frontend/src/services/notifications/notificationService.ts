import { prisma } from "@/lib/prisma";

export type NotificationType = "backtest" | "sync" | "system" | "quota";

export interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
}

export class NotificationService {
  /**
   * Get recent notifications for a user from PostgreSQL Database.
   */
  static async getUserNotifications(userId: string) {
    try {
      const items = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 30,
      });

      return items.map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type as NotificationType,
        read: n.read,
        link: n.link,
        timestamp: this.formatRelativeTime(n.createdAt),
      }));
    } catch (err) {
      console.error("getUserNotifications error:", err);
      return [];
    }
  }

  /**
   * Create a persistent notification in Database.
   */
  static async createNotification(input: CreateNotificationInput) {
    try {
      return await prisma.notification.create({
        data: {
          userId: input.userId,
          title: input.title,
          message: input.message,
          type: input.type || "system",
          link: input.link,
        },
      });
    } catch (err) {
      console.error("createNotification error:", err);
      return null;
    }
  }

  /**
   * Mark all notifications as read for a user.
   */
  static async markAllAsRead(userId: string) {
    try {
      await prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true },
      });
      return true;
    } catch (err) {
      console.error("markAllAsRead error:", err);
      return false;
    }
  }

  /**
   * Mark a single notification as read.
   */
  static async markAsRead(id: string, userId: string) {
    try {
      await prisma.notification.updateMany({
        where: { id, userId },
        data: { read: true },
      });
      return true;
    } catch (err) {
      console.error("markAsRead error:", err);
      return false;
    }
  }

  /**
   * Delete all notifications for a user.
   */
  static async clearAll(userId: string) {
    try {
      await prisma.notification.deleteMany({
        where: { userId },
      });
      return true;
    } catch (err) {
      console.error("clearAll notifications error:", err);
      return false;
    }
  }

  private static formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }
}
