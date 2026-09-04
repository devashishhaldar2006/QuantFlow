import { auth } from "@clerk/nextjs/server";

import { getUserByClerkId } from "@/services/auth/userService";
import {
  createProSubscription,
  createProOrder,
} from "@/services/billing/billingService";

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const user =
      await getUserByClerkId(clerkUserId);

    if (!user) {
      return Response.json(
        {
          error:
            "User account is not synchronized",
        },
        { status: 403 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      mode?: "order" | "subscription";
    };

    // Default to standard one-time order for 100% instant UPI / QR / Netbanking / Card support without eMandate limits
    if (body.mode === "subscription") {
      const subscription = await createProSubscription(user.id);
      return Response.json(subscription, { status: 201 });
    }

    const order = await createProOrder(user.id);
    return Response.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "Failed to create Pro subscription:",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create subscription.";

    if (
      message.includes(
        "already has a Pro plan",
      )
    ) {
      return Response.json(
        { error: message },
        { status: 409 },
      );
    }

    if (
      message.includes(
        "RAZORPAY",
      )
    ) {
      return Response.json(
        { error: "Billing is not configured." },
        { status: 500 },
      );
    }

    return Response.json(
      { error: message },
      { status: 500 },
    );
  }
}