import LegalPageLayout from "@/components/legal/LegalPageLayout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How QuantFlow collects, protects, uses, and safeguards your data and algorithmic credentials."
      lastUpdated="August 29, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p>
          We collect personal information necessary to provide quantitative services, including email address, name, authentication identifiers (via Clerk), billing data (processed securely via Razorpay), and strategy execution telemetry logs.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. How We Use Information</h2>
        <p>
          Collected data is strictly utilized to authenticate user sessions, execute requested C++ backtests, process subscription payments, deliver technical support, and maintain platform security. We do not sell user data or trading algorithms to third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Data Protection & Security</h2>
        <p>
          We employ enterprise-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. Sensitive API keys and authentication tokens are encrypted using industry-standard key management systems.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Payment Processing Safety</h2>
        <p>
          Payment transactions are securely handled directly by Razorpay. QuantFlow does not store full credit/debit card numbers or confidential banking credentials on our servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">5. Cookies & Analytics</h2>
        <p>
          We use essential session cookies required for authentication and platform stability. Aggregated, non-personally identifiable telemetry is analyzed to optimize backend computational engine performance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">6. Your Data Rights</h2>
        <p>
          You have the right to request access to your stored personal data, request corrections, or request complete account deletion at any time by contacting our support team.
        </p>
      </section>
    </LegalPageLayout>
  );
}
