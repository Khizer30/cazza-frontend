import React, { useEffect } from "react";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none space-y-6">
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Organisation:</strong> Social Commerce Accountants Ltd (SCA)
          </p>
          <p className="text-gray-700">
            <strong>Effective Date:</strong> 27th September 2025
          </p>
          <p className="text-gray-700">
            <strong>Contact Email:</strong>{" "}
            contact@socialcommerceaccountants.com
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Social Commerce Accountants Ltd ("SCA," "we," "our," "us"), we
            are committed to protecting your privacy and handling your personal
            data responsibly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our services, including our web application
            ("SCAi"), website, and integrations with third- party platforms such
            as Amazon, Shopify, TikTok Shop, and Xero.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We comply with applicable data protection laws, including the UK
            Data Protection Act 2018 and the EU General Data Protection
            Regulation (GDPR).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Information We Collect
          </h2>
          <p className="text-gray-700">
            We may collect the following types of information:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Account Information:</strong> Name, email address, login
                credentials, and company details provided when creating an
                account.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Financial Data (via API integrations):</strong> Sales,
                refunds, payouts, fees, invoices, and accounting entries from
                platforms such as Amazon, Shopify, TikTok Shop, and Xero.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Usage Data:</strong> Log data, IP address, browser type,
                and activity on our app/website.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Support Data:</strong> Information you provide when
                contacting us for support or inquiries.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            We use your information for the following purposes:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To provide and operate our SaaS application.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To integrate and process data from third-party platforms (e.g.
                Amazon, Shopify, TikTok Shop, Xero) at your request.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To generate analytics, dashboards, and reports relevant to your
                business.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To ensure security, monitor usage, and detect/prevent fraud.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To communicate with you about your account, updates, and support
                requests.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                To comply with legal and regulatory obligations.
              </span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            4. Legal Basis for Processing
          </h2>
          <p className="text-gray-700">
            We process personal data under the following legal bases:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Contractual necessity (to deliver the services you signed up
                for).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Legitimate interests (to improve and secure our services).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Legal obligations (to comply with accounting and tax laws).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Consent (where required, e.g. marketing communications).
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            5. Data Sharing & Third Parties
          </h2>
          <p className="text-gray-700">We may share your information with:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Cloud service providers (Supabase, Vercel, Resend, GitHub) for
                hosting, storage, and operations.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Third-party platforms (Amazon, Shopify, TikTok Shop, Xero) for
                integrations you explicitly authorise.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Professional advisors (accountants, auditors, legal).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Regulators or authorities if legally required.
              </span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            All third parties are vetted and must meet our security standards.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            6. International Data Transfers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We primarily store data in the EU (Ireland) via Supabase. Some
            third-party providers may process data in other jurisdictions (e.g.
            US). Where data is transferred outside the UK/EU, we ensure
            safeguards such as Standard Contractual Clauses (SCCs) are in place.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            7. Data Retention
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Client financial data is retained for the duration of the
                contract.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Upon termination, all data is deleted within 30 days, unless
                retention is required by law.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Backups are retained for 30 days before automatic deletion.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            8. Your Rights
          </h2>
          <p className="text-gray-700">
            You have the following rights under GDPR:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right of access</strong> – request a copy of your data.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right to rectification</strong> – correct inaccurate or
                incomplete data.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right to erasure</strong> – request deletion of your
                data.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right to restrict processing</strong> – limit how your
                data is used.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right to data portability</strong> – receive your data
                in a machine-readable format.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                <strong>Right to object</strong> – opt out of certain
                processing.
              </span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Requests can be made by emailing [Insert DPO email]. We will respond
            within 30 days.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">9. Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organisational measures to
            protect your data, including:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Encryption in transit (TLS/HTTPS) and at rest.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Role-based access controls and multi-factor authentication.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Row Level Security (RLS) to segregate client data.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Regular vulnerability management and patching.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            10. Children's Data
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not directed at children under 18. We do not
            knowingly collect personal data from children.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            11. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. The latest
            version will always be available on our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            12. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For questions, concerns, or to exercise your rights, please contact:
          </p>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Data Protection Officer (DPO):</strong>
            </p>
            <p>Social Commerce Accountants Ltd</p>
            <p>Email: contact@socialcommerceaccountants.com</p>
            <p>
              Address: Unit D2, Office 2, The Maltings, Station Road,
              Sawbridgeworth, CM21 9JX
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
