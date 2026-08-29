import "server-only";

import crypto from "node:crypto";

import { prisma } from "@/lib/prisma";

type RazorpayWebhookPayload = {
  event?: string;

  payload?: {
    subscription?: {
      entity?: {
        id?: string;
        status?: string;
        current_start?: number | null;
        current_end?: number | null;
      };
    };
  };
};

function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function unixSecondsToDate(value: number | null | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  return new Date(value * 1000);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not configured.");

    return Response.json(
      { error: "Webhook is not configured." },
      { status: 500 },
    );
  }

  /*
   * IMPORTANT:
   * Razorpay signature verification requires the raw
   * request body. Do not use request.json() here.
   */
  const rawBody = await request.text();

  const signature = request.headers.get("x-razorpay-signature");

  const providerEventId = request.headers.get("x-razorpay-event-id");

  if (!signature) {
    return Response.json(
      { error: "Missing webhook signature." },
      { status: 400 },
    );
  }

  if (!providerEventId) {
    return Response.json(
      { error: "Missing webhook event ID." },
      { status: 400 },
    );
  }

  const isValidSignature = verifyWebhookSignature(
    rawBody,
    signature,
    webhookSecret,
  );

  if (!isValidSignature) {
    console.warn("Rejected Razorpay webhook: invalid signature.");

    return Response.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }

  let payload: RazorpayWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const eventType = payload.event;

  if (!eventType) {
    return Response.json({ error: "Missing event type." }, { status: 400 });
  }

  /*
   * Idempotency:
   *
   * Razorpay may deliver the same webhook more than once.
   * We store the provider event ID with a unique constraint.
   */
  const existingEvent = await prisma.billingEvent.findUnique({
    where: {
      providerEventId,
    },
  });

  if (existingEvent?.status === "PROCESSED") {
    return Response.json({
      received: true,
      duplicate: true,
    });
  }

  let billingEvent = existingEvent;
  let isNewEvent = false;

  if (!billingEvent) {
    try {
      billingEvent = await prisma.billingEvent.create({
        data: {
          provider: "razorpay",
          providerEventId,
          eventType,
          status: "RECEIVED",
          payload,
        },
      });

      isNewEvent = true;
    } catch (error) {
      /*
       * Another webhook request may have created the same
       * event between findUnique() and create().
       *
       * Re-read the event so duplicate delivery remains safe.
       */
      const duplicateEvent = await prisma.billingEvent.findUnique({
        where: {
          providerEventId,
        },
      });

      if (!duplicateEvent) {
        console.error("Failed to create BillingEvent:", error);

        return Response.json(
          {
            error: "Failed to store webhook event.",
          },
          { status: 500 },
        );
      }

      billingEvent = duplicateEvent;
    }
  }

  /*
   * A newly-created event must be processed by this request.
   *
   * Only an existing RECEIVED event is treated as being
   * processed by another request.
   */
  if (!isNewEvent && billingEvent.status === "RECEIVED") {
    return Response.json({
      received: true,
      processing: true,
    });
  }

  const subscriptionId = payload.payload?.subscription?.entity?.id;

  /*
   * We currently care about subscription lifecycle events.
   * Other Razorpay events are safely recorded but ignored.
   */
  const subscriptionEvents = new Set([
    "subscription.authenticated",
    "subscription.activated",
    "subscription.charged",
    "subscription.updated",
    "subscription.paused",
    "subscription.resumed",
    "subscription.cancelled",
    "subscription.completed",
    "subscription.halted",
    "subscription.expired",
  ]);

  if (!subscriptionEvents.has(eventType) || !subscriptionId) {
    await prisma.billingEvent.update({
      where: {
        id: billingEvent.id,
      },
      data: {
        status: "PROCESSED",
        processedAt: new Date(),
      },
    });

    return Response.json({
      received: true,
      ignored: true,
    });
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        providerSubscriptionId: subscriptionId,
      },
    });

    if (!subscription) {
      throw new Error(
        `Subscription ${subscriptionId} was not found in QuantFlow.`,
      );
    }

    const razorpaySubscription = payload.payload?.subscription?.entity;

    const currentPeriodStart = unixSecondsToDate(
      razorpaySubscription?.current_start,
    );

    const currentPeriodEnd = unixSecondsToDate(
      razorpaySubscription?.current_end,
    );

    /*
     * Map Razorpay's lifecycle into QuantFlow's smaller
     * subscription state machine.
     */
    let nextStatus = subscription.status;
    let nextUserPlan: "FREE" | "PRO" | undefined;

    switch (eventType) {
      case "subscription.authenticated":
        /*
         * Razorpay has authenticated the mandate, but for
         * an immediately-starting subscription the next
         * important event is subscription.activated.
         *
         * Keep QuantFlow's subscription as CREATED until
         * activation is confirmed.
         */
        nextStatus = "CREATED";
        break;

      case "subscription.activated":
      case "subscription.charged":
      case "subscription.resumed":
        nextStatus = "ACTIVE";
        nextUserPlan = "PRO";
        break;

      case "subscription.paused":
        nextStatus = "PAUSED";
        nextUserPlan = "FREE";
        break;

      case "subscription.cancelled":
        nextStatus = "CANCELLED";
        nextUserPlan = "FREE";
        break;

      case "subscription.completed":
        nextStatus = "EXPIRED";
        nextUserPlan = "FREE";
        break;

      case "subscription.halted":
        nextStatus = "EXPIRED";
        nextUserPlan = "FREE";
        break;

      case "subscription.expired":
        nextStatus = "EXPIRED";
        nextUserPlan = "FREE";
        break;

      case "subscription.updated": {
        const razorpayStatus = razorpaySubscription?.status;

        if (razorpayStatus === "active") {
          nextStatus = "ACTIVE";
          nextUserPlan = "PRO";
        } else if (razorpayStatus === "paused") {
          nextStatus = "PAUSED";
          nextUserPlan = "FREE";
        } else if (razorpayStatus === "cancelled") {
          nextStatus = "CANCELLED";
          nextUserPlan = "FREE";
        } else if (
          razorpayStatus === "completed" ||
          razorpayStatus === "expired" ||
          razorpayStatus === "halted"
        ) {
          nextStatus = "EXPIRED";
          nextUserPlan = "FREE";
        }

        break;
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.subscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          status: nextStatus,
          currentPeriodStart:
            currentPeriodStart ?? subscription.currentPeriodStart,
          currentPeriodEnd: currentPeriodEnd ?? subscription.currentPeriodEnd,
          cancelledAt:
            nextStatus === "CANCELLED" ? new Date() : subscription.cancelledAt,
        },
      });

      if (nextUserPlan) {
        await tx.user.update({
          where: {
            id: subscription.userId,
          },
          data: {
            plan: nextUserPlan,
          },
        });
      }

      await tx.billingEvent.update({
        where: {
          id: billingEvent.id,
        },
        data: {
          status: "PROCESSED",
          processedAt: new Date(),
        },
      });
    });

    return Response.json({
      received: true,
      processed: true,
    });
  } catch (error) {
    console.error(
      `Failed to process Razorpay webhook ${providerEventId}:`,
      error,
    );

    await prisma.billingEvent.update({
      where: {
        id: billingEvent.id,
      },
      data: {
        status: "FAILED",
        failedAt: new Date(),
        errorMessage:
          error instanceof Error
            ? error.message
            : "Unknown webhook processing error.",
      },
    });

    /*
     * 500 tells Razorpay that processing failed, allowing
     * the webhook to be retried.
     */
    return Response.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }
}
