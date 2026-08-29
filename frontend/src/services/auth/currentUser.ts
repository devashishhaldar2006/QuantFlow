import "server-only";

import { auth } from "@clerk/nextjs/server";

import { getUserByClerkId } from "./userService";

export async function getCurrentUser() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return null;
  }

  return getUserByClerkId(clerkUserId);
}