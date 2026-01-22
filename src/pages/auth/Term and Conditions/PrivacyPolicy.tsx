import { useEffect } from "react";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 flex items-center justify-center">
      <div className="relative bg-white max-w-4xl mx-4 w-full border-[10px] border-gray-800 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.1)] p-10">
        {/* Decorative inner border */}
        <div className="absolute inset-3 border-[3px] border-gray-500 rounded-lg pointer-events-none" />

        <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center uppercase tracking-wide">Privacy Policy</h1>

        <div className="space-y-10 text-gray-800 leading-relaxed max-w-2xl mx-auto">
          <div className="space-y-2 text-center">
            <p>
              <strong>Organisation:</strong> Social Commerce Accountants Ltd (SCA)
            </p>
            <p>
              <strong>Effective Date:</strong> 27th September 2025
            </p>
            <p>
              <strong>Contact Email:</strong> contact@socialcommerceaccountants.com
            </p>
          </div>

          {/* 1. Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">1. Introduction</h2>
            <p>
              At Social Commerce Accountants Ltd ("SCA," "we," "our," "us"), we are committed to protecting your privacy
              and handling your personal data responsibly.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, and protect your information when you use our services,
              including our web application ("SCAi"), website, and integrations with third-party platforms such as
              Amazon, Shopify, TikTok Shop, and Xero.
            </p>
            <p>
              We comply with applicable data protection laws, including the UK Data Protection Act 2018 and the EU
              General Data Protection Regulation (GDPR).
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address, login credentials, and company details
                provided when creating an account.
              </li>
              <li>
                <strong>Financial Data (via API integrations):</strong> Sales, refunds, payouts, fees, invoices, and
                accounting entries from platforms such as Amazon, Shopify, TikTok Shop, and Xero.
              </li>
              <li>
                <strong>Usage Data:</strong> Log data, IP address, browser type, and activity on our app/website.
              </li>
              <li>
                <strong>Support Data:</strong> Information you provide when contacting us for support or inquiries.
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and operate our SaaS application.</li>
              <li>
                To integrate and process data from third-party platforms (e.g. Amazon, Shopify, TikTok Shop, Xero) at
                your request.
              </li>
              <li>To generate analytics, dashboards, and reports relevant to your business.</li>
              <li>To ensure security, monitor usage, and detect/prevent fraud.</li>
              <li>To communicate with you about your account, updates, and support requests.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
            <p>We do not sell or rent your personal data to third parties.</p>
          </section>

          {/* 4–12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">4. Legal Basis for Processing</h2>
            <p>We process personal data under the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contractual necessity (to deliver the services you signed up for).</li>
              <li>Legitimate interests (to improve and secure our services).</li>
              <li>Legal obligations (to comply with accounting and tax laws).</li>
              <li>Consent (where required, e.g. marketing communications).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">5. Data Sharing &amp; Third Parties</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cloud service providers (Supabase, Vercel, Resend, GitHub) for hosting, storage, and operations.</li>
              <li>
                Third-party platforms (Amazon, Shopify, TikTok Shop, Xero) for integrations you explicitly authorise.
              </li>
              <li>Professional advisors (accountants, auditors, legal).</li>
              <li>Regulators or authorities if legally required.</li>
            </ul>
            <p>All third parties are vetted and must meet our security standards.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">6. International Data Transfers</h2>
            <p>
              We primarily store data in the EU (Ireland) via Supabase. Some third-party providers may process data in
              other jurisdictions (e.g. US). Where data is transferred outside the UK/EU, we ensure safeguards such as
              Standard Contractual Clauses (SCCs) are in place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">7. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Client financial data is retained for the duration of the contract.</li>
              <li>Upon termination, all data is deleted within 30 days, unless retention is required by law.</li>
              <li>Backups are retained for 30 days before automatic deletion.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">8. Your Rights</h2>
            <p>You have the following rights under GDPR:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Right of access</strong> – request a copy of your data.
              </li>
              <li>
                <strong>Right to rectification</strong> – correct inaccurate data.
              </li>
              <li>
                <strong>Right to erasure</strong> – request deletion of your data.
              </li>
              <li>
                <strong>Right to restrict processing</strong> – limit data use.
              </li>
              <li>
                <strong>Right to data portability</strong> – receive your data.
              </li>
              <li>
                <strong>Right to object</strong> – opt out of processing.
              </li>
            </ul>
            <p>Requests can be made by emailing [Insert DPO email]. We will respond within 30 days.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">9. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your data, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption in transit (TLS/HTTPS) and at rest.</li>
              <li>Role-based access controls and multi-factor authentication.</li>
              <li>Row Level Security (RLS) to segregate client data.</li>
              <li>Regular vulnerability management and patching.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">10. Children's Data</h2>
            <p>
              Our services are not directed at children under 18. We do not knowingly collect personal data from
              children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The latest version will always be available on our
              website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">12. Contact Us</h2>
            <p>For questions, concerns, or to exercise your rights, please contact:</p>
            <div className="space-y-2">
              <p>
                <strong>Data Protection Officer (DPO):</strong>
              </p>
              <p>Social Commerce Accountants Ltd</p>
              <p>Email: contact@socialcommerceaccountants.com</p>
              <p>Address: Unit D2, Office 2, The Maltings, Station Road, Sawbridgeworth, CM21 9JX</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-700 italic text-sm">
          <p>Issued by Social Commerce Accountants Ltd • Protecting Your Data with Integrity</p>
          <div className="mt-2 border-t border-gray-600 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
