import LegalPageLayout from "@/components/legal/LegalPageLayout";

export default function RefundPage() {
  return (
    <LegalPageLayout
      title="Cancellation & Refund Policy"
      subtitle="Clear guidelines regarding subscription cancellations, trial periods, and refund eligibility for QuantFlow services."
      lastUpdated="August 29, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Subscription Cancellation</h2>
        <p>
          You may cancel your QuantFlow PRO or INSTITUTIONAL subscription at any time directly through your Profile Billing Dashboard. Upon cancellation, your subscription will remain active until the conclusion of the current prepaid billing period.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. 7-Day Money-Back Guarantee</h2>
        <p>
          We offer a full 7-day money-back guarantee for first-time subscribers. If you are not satisfied with QuantFlow&apos;s computational speed or feature set, you may request a 100% refund within 7 days of initial purchase by contacting support@quantflow.io.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Refund Processing Timeline</h2>
        <p>
          Approved refunds are processed immediately back to the original payment method used during checkout (via Razorpay). Funds typically reflect in your bank account or card balance within 5 to 7 business days depending on your financial institution.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Non-Refundable Scenarios</h2>
        <p>
          Refund requests submitted after the 7-day money-back guarantee window, or accounts suspended due to violations of our Terms of Service, are not eligible for partial or pro-rated refunds.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. How to Request a Refund</h2>
        <p>
          To request a refund, please send an email to support@quantflow.io with your registered account email address, subscription transaction ID, and a brief description of your request.
        </p>
      </section>
    </LegalPageLayout>
  );
}
