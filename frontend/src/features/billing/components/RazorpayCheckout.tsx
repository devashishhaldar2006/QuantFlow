"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

type CheckoutResponse = {
  subscriptionId: string;
  keyId: string;
};

declare global {
  interface Window {
    Razorpay: new (
      options: Record<string, unknown>,
    ) => {
      open: () => void;
    };
  }
}

export default function RazorpayCheckout() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    null,
  );

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<CheckoutResponse>(
        "/api/billing/checkout",
      );

      const checkout = response.data;

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout SDK has not loaded. Please refresh the page.",
        );
      }

      const razorpay =
        new window.Razorpay({
          key: checkout.keyId,

          subscription_id:
            checkout.subscriptionId,

          name: "QuantFlow",

          description:
            "QuantFlow Pro - ₹9 / month",

          prefill: {
            name:
              user?.fullName ||
              user?.username ||
              "QuantFlow Trader",
            email:
              user?.primaryEmailAddress
                ?.emailAddress || "",
            contact: "9999999999",
          },

          theme: {
            color: "#6366f1",
          },

          handler: async function (
            response: Record<string, unknown>,
          ) {
            console.log(
              "Razorpay Payment Success:",
              response,
            );
            try {
              await axios.post("/api/billing/verify", {
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_subscription_id:
                  response.razorpay_subscription_id,
                razorpay_signature:
                  response.razorpay_signature,
              });
            } catch (err) {
              console.error(
                "Failed to activate subscription via API:",
                err,
              );
            } finally {
              router.push("/billing/success");
            }
          },

          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        });

      razorpay.open();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Opening Checkout..."
          : "Upgrade to Pro"}
      </button>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}