import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getUserByClerkId(clerkId: string) {
  try {
    // 1. First check by clerkId
    let user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (user) {
      return user;
    }

    // 2. If not found by clerkId, get email from Clerk
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress || `${clerkId}@quantflow.io`;
    const name = clerkUser?.fullName || clerkUser?.firstName || "QuantFlow Trader";

    // 3. Check if user already exists by email to prevent duplicate email constraint failure
    const existingByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingByEmail) {
      // Link the existing user record with the current clerkId
      user = await prisma.user.update({
        where: { email },
        data: { clerkId, name },
      });
      return user;
    }

    // 4. Create new user safely
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name,
        plan: "FREE",
      },
    });

    return user;
  } catch (err) {
    console.error("getUserByClerkId error:", err);
  }

  // Graceful fallback user object so Dashboard never throws unhandled errors
  return {
    id: clerkId,
    clerkId,
    email: "trader@quantflow.io",
    name: "QuantFlow Trader",
    plan: "FREE" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}