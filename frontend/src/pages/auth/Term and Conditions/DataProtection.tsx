import { useEffect } from "react";

export const DataProtection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 flex items-center justify-center">
      <div className="relative bg-white max-w-4xl mx-4 w-full border-[10px] border-gray-800 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.1)] p-10">
        {/* Decorative inner border */}
        <div className="absolute inset-3 border-[3px] border-gray-500 rounded-lg pointer-events-none"></div>

        <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center uppercase tracking-wide">
          Data Protection &amp; Security
        </h1>

        <div className="space-y-10 text-gray-800 leading-relaxed max-w-2xl mx-auto">
          <section className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">
              Your data. Protected by design.
            </h2>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              How Cazza handles your data
            </h3>
            <p>
              Cazza connects only through official APIs: Amazon SP-API, TikTok
              Shop, Shopify, and Xero. Every connection uses OAuth — meaning you
              authorise access directly on each platform and can revoke it at
              any time.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Data access
            </h3>
            <p>
              We retrieve specific, permission-based data such as orders,
              settlements, refunds, and fees — strictly for analytical use
              within your own account. Cazza never performs write actions, and
              never accesses customer-level personal data beyond what’s required
              to calculate financial metrics.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Data usage
            </h3>
            <p>
              Your data is used solely to generate insights and reports visible
              to you and your authorised team members. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Share or sell data to third parties</li>
              <li>
                Use your data for advertising, benchmarking, or model training
              </li>
              <li>Combine data between clients</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Data retention
            </h3>
            <p>
              If you disconnect a platform or close your Cazza account, all data
              retrieved from that platform is deleted from our servers within 30
              days. Aggregated metrics may remain in anonymised form for
              internal performance monitoring.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Security
            </h3>
            <p>We use enterprise-grade security at every layer:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AES-256 encryption at rest and in transit</li>
              <li>OAuth 2.0 authentication for all integrations</li>
              <li>Secure AWS hosting in the EU-West region</li>
              <li>Regular penetration testing and vulnerability scans</li>
              <li>Strict least-access permissions for staff and systems</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Compliance
            </h3>
            <p>Cazza complies with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Amazon SP-API Data Protection Policy</li>
              <li>TikTok Shop Developer Policy</li>
              <li>Shopify Partner &amp; API Terms of Service</li>
              <li>Xero Developer Agreement</li>
              <li>GDPR and the UK Data Protection Act 2018</li>
            </ul>

            <p className="mt-2">We are developed and operated by:</p>
            <p className="font-medium">Social Commerce Accountants Ltd</p>
            <p>Company No. 13802919</p>
            <p>
              Unit D2 Office 2, Station Road, Sawbridgeworth, England, CM21 9JX
            </p>
            <p>
              Contact:{" "}
              <a
                href="mailto:support@cazza.ai"
                className="underline hover:text-gray-900"
              >
                support@cazza.ai
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold font-serif text-gray-900">
              Want more detail?
            </h3>
            <p>
              Read our{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-900"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-and-conditions"
                className="underline hover:text-gray-900"
              >
                Terms &amp; Conditions
              </a>{" "}
              for complete information.
            </p>
          </section>
        </div>

        {/* Footer line */}
        <div className="mt-12 text-center text-gray-700 italic text-sm">
          <p>Issued by Cazza • Protecting Your Data with Integrity</p>
          <div className="mt-2 border-t border-gray-600 w-40 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
