import "server-only";

import { prisma } from "@/lib/prisma";

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}