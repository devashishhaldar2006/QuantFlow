import LegalPageLayout from "@/components/legal/LegalPageLayout";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Please review the rules and regulations governing your access and usage of the QuantFlow quantitative platform."
      lastUpdated="August 29, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By creating an account or accessing QuantFlow (&quot;the Platform&quot;), you agree to be legally bound by these Terms of Service. If you do not agree to all terms, you are prohibited from using or accessing the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Description of Platform Services</h2>
        <p>
          QuantFlow provides cloud-based quantitative algorithmic strategy backtesting, execution simulation, and analytical modeling tools compiled in high-performance C++. QuantFlow is a software provider and is not a registered financial broker, investment advisor, or asset manager.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. User Accounts & Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You agree to immediately notify QuantFlow support of any unauthorized use of your account. QuantFlow is not liable for losses resulting from compromised account credentials.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Subscriptions & Payments</h2>
        <p>
          Access to premium trading features (PRO and INSTITUTIONAL tiers) requires a recurring subscription handled via integrated secure payment gateways (including Razorpay). Subscriptions auto-renew unless cancelled prior to the next billing cycle.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Intellectual Property & Code Ownership</h2>
        <p>
          All proprietary algorithms, platform graphics, UI components, backend C++ engines, and documentation remain the exclusive intellectual property of QuantFlow. Custom strategies uploaded or compiled by users remain the property of the respective user.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">6. Disclaimer of Risk & Limitation of Liability</h2>
        <p>
          Backtested trading performance results are hypothetical and do not represent actual live trading results. Trading financial instruments carries substantial risk of loss. QuantFlow is provided &quot;AS IS&quot; without warranties of any kind.
        </p>
      </section>
    </LegalPageLayout>
  );
}
