import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/services/auth/userService";
import { activateProSubscription } from "@/services/billing/billingService";

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return Response.json(
        { error: "User account is not synchronized" },
        { status: 403 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      razorpay_payment_id?: string;
      razorpay_subscription_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    };

    await activateProSubscription(
      user.id,
      body.razorpay_subscription_id,
      body.razorpay_payment_id,
      body.razorpay_signature,
      body.razorpay_order_id,
    );

    return Response.json(
      { success: true, plan: "PRO" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to verify & activate Pro plan:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to activate subscription.",
      },
      { status: 500 },
    );
  }
}
