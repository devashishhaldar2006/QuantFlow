import "server-only";

import Razorpay from "razorpay";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is not configured.`,
    );
  }

  return value;
}

export function getRazorpayClient(): Razorpay {
  const keyId =
    getRequiredEnv("RAZORPAY_KEY_ID");

  const keySecret =
    getRequiredEnv("RAZORPAY_KEY_SECRET");

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export function getRazorpayKeyId(): string {
  return getRequiredEnv(
    "RAZORPAY_KEY_ID",
  );
}