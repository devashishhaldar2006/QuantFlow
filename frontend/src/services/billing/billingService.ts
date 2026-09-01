import "server-only";

import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "./razorpayClient";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

type CreateProSubscriptionResult = {
  subscriptionId: string;
  keyId: string;
};

export async function createProSubscription(
  userId: string,
): Promise<CreateProSubscriptionResult> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.plan === "PRO") {
    throw new Error(
      "User already has a Pro plan.",
    );
  }

  // Clean up any stale unactivated CREATED subscriptions so fresh checkouts get a clean Razorpay subscription
  await prisma.subscription.updateMany({
    where: {
      userId,
      status: "CREATED",
    },
    data: {
      status: "EXPIRED",
    },
  });

  const existingSubscription =
    await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: [
            "ACTIVE",
            "PAUSED",
          ],
        },
      },
    });

  if (existingSubscription) {
    return {
      subscriptionId:
        existingSubscription.providerSubscriptionId,
      keyId: getRazorpayKeyId(),
    };
  }

  const razorpayProPlanId =
    getRequiredEnv(
      "RAZORPAY_PRO_PLAN_ID",
    );

  const razorpay =
    getRazorpayClient();

  const razorpayKeyId =
    getRazorpayKeyId();

  const subscription =
    await new Promise<{ id: string }>(
      (resolve, reject) => {
        razorpay.subscriptions.create(
          {
            plan_id:
              razorpayProPlanId,

            total_count: 12,

            quantity: 1,

            customer_notify: false,

            notes: {
              quantflow_user_id:
                user.id,
            },
          },

          (
            error: unknown,
            result: { id?: string },
          ) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result?.id) {
              reject(
                new Error(
                  "Razorpay did not return a subscription ID.",
                ),
              );
              return;
            }

            resolve({
              id: result.id,
            });
          },
        );
      },
    );

  await prisma.subscription.create({
    data: {
      userId: user.id,

      provider: "razorpay",

      providerSubscriptionId:
        subscription.id,

      status: "CREATED",

      plan: "PRO",
    },
  });

  return {
    subscriptionId:
      subscription.id,

    keyId: razorpayKeyId,
  };
}

export async function getProviderSubscription(
  subscriptionId: string,
) {
  const razorpay =
    getRazorpayClient();

  return new Promise(
    (resolve, reject) => {
      razorpay.subscriptions.fetch(
        subscriptionId,

        (
          error: unknown,
          result: unknown,
        ) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        },
      );
    },
  );
}

export async function activateProSubscription(
  userId: string,
  razorpaySubscriptionId?: string,
  razorpayPaymentId?: string,
  razorpaySignature?: string,
) {
  if (!razorpayPaymentId || !razorpaySubscriptionId || !razorpaySignature) {
    throw new Error("Missing required payment verification parameters.");
  }

  const keySecret = getRequiredEnv("RAZORPAY_KEY_SECRET");
  const payload = `${razorpayPaymentId}|${razorpaySubscriptionId}`;
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(payload)
    .digest("hex");

  const expectedBuf = Buffer.from(expectedSignature, "utf8");
  const receivedBuf = Buffer.from(razorpaySignature, "utf8");

  if (
    expectedBuf.length !== receivedBuf.length ||
    !crypto.timingSafeEqual(expectedBuf, receivedBuf)
  ) {
    throw new Error("Invalid Razorpay payment signature.");
  }

  let sub = razorpaySubscriptionId
    ? await prisma.subscription.findFirst({
        where: {
          userId,
          providerSubscriptionId: razorpaySubscriptionId,
        },
      })
    : null;

  if (!sub) {
    sub = await prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  const eventId = `evt_${razorpayPaymentId || razorpaySubscriptionId || Date.now()}`;

  if (sub) {
    await prisma.$transaction([
      prisma.subscription.update({
        where: { id: sub.id },
        data: {
          status: "ACTIVE",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ),
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { plan: "PRO" },
      }),
      prisma.billingEvent.upsert({
        where: { providerEventId: eventId },
        create: {
          provider: "razorpay",
          providerEventId: eventId,
          eventType: "subscription.activated",
          status: "PROCESSED",
          payload: {
            userId,
            razorpaySubscriptionId,
            razorpayPaymentId,
          },
          processedAt: new Date(),
        },
        update: {
          status: "PROCESSED",
          processedAt: new Date(),
        },
      }),
    ]);
  } else {
    const subId = razorpaySubscriptionId || `sub_direct_${Date.now()}`;
    await prisma.$transaction([
      prisma.subscription.create({
        data: {
          userId,
          provider: "razorpay",
          providerSubscriptionId: subId,
          status: "ACTIVE",
          plan: "PRO",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ),
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { plan: "PRO" },
      }),
      prisma.billingEvent.upsert({
        where: { providerEventId: eventId },
        create: {
          provider: "razorpay",
          providerEventId: eventId,
          eventType: "subscription.activated",
          status: "PROCESSED",
          payload: {
            userId,
            razorpaySubscriptionId: subId,
            razorpayPaymentId,
          },
          processedAt: new Date(),
        },
        update: {
          status: "PROCESSED",
          processedAt: new Date(),
        },
      }),
    ]);
  }
}

export async function cancelProSubscription(
  userId: string,
) {
  const subscription =
    await prisma.subscription.findFirst({
      where: {
        userId,

        provider: "razorpay",

        status: {
          in: [
            "CREATED",
            "ACTIVE",
            "PAUSED",
          ],
        },
      },
    });

  if (!subscription) {
    throw new Error(
      "No active Pro subscription found.",
    );
  }

  const razorpay =
    getRazorpayClient();

  return new Promise(
    (resolve, reject) => {
      razorpay.subscriptions.cancel(
        subscription.providerSubscriptionId,

        true,

        (
          error: unknown,
          result: unknown,
        ) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        },
      );
    },
  );
}