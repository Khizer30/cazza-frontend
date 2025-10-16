import React, { useEffect } from "react";

export const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Terms and Conditions of Use
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        (Last updated: September 2025)
      </p>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-gray-700 leading-relaxed">
          These Terms and Conditions, together with our Privacy Policy and any
          other legal documents referred to herein, set out the terms under
          which you may use the Cazza.ai Service. Please read these Terms
          carefully and ensure you understand them before using the Service. By
          creating an account, subscribing, or otherwise using the Service, you
          agree to comply with and be bound by these Terms. If you do not agree,
          you must stop using the Service immediately.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            1. Definitions
          </h2>
          <p className="text-gray-700">For the purposes of these Terms:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "Account" – means a registered user account required to access
                and use the Service.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "Service" – means the Cazza.ai SaaS platform, including all
                features, dashboards, integrations (Amazon, Shopify, TikTok
                Shop, Xero, and others), and related functionality provided
                under a subscription.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "Subscription" – means the paid subscription plan purchased to
                access the Service, whether monthly or annually.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "User Content" – means all data, information, or material
                provided, inputted, or submitted by you or on your behalf into
                the Service, including data obtained via API integrations.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "Update" – means modifications, improvements, patches, upgrades,
                or new features we may release.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "We/us/our" – means Social Commerce Accountants Ltd, trading as
                Cazza.ai, a company registered in England and Wales under
                company number 13802919, with its registered office at Unit D2,
                Office 2, The Maltings, Station Road, Sawbridgeworth, CM21 9JX.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                "You/your" – means the person, business, or organisation that
                subscribes to and uses the Service.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Information About Us
          </h2>
          <p className="text-gray-700">
            The Service is owned and operated by Social Commerce Accountants
            Ltd, trading as Cazza.ai.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            3. Access and Availability
          </h2>
          <p className="text-gray-700">
            3.1. Access to the Service requires a Subscription. Upon purchase,
            the Service will be available for the duration of that Subscription
            and any renewals, subject to these Terms.
          </p>
          <p className="text-gray-700">
            3.2. We will use reasonable endeavours to maintain Service
            availability 24/7, except for planned maintenance, emergency
            downtime, or Force Majeure events.
          </p>
          <p className="text-gray-700">
            3.3. We may update or change the Service at any time, including
            adding or removing features, provided that such changes do not
            materially reduce the core functionality of your Subscription.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">4. Accounts</h2>
          <p className="text-gray-700">
            4.1. You must be at least 18 years of age to create an Account.
          </p>
          <p className="text-gray-700">
            4.2. You agree to provide accurate and complete information during
            account creation and keep it updated.
          </p>
          <p className="text-gray-700">
            4.3. You are responsible for maintaining the confidentiality of your
            login credentials. You are liable for all activity under your
            Account.
          </p>
          <p className="text-gray-700">
            4.4. If you believe your Account is compromised, you must notify us
            immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            5. Subscriptions and Pricing
          </h2>
          <p className="text-gray-700">
            5.1. Different Subscription tiers may offer different levels of
            access and features. Details are available on our website.
          </p>
          <p className="text-gray-700">
            5.2. Subscription fees are payable in advance and are non-refundable
            except where required by law.
          </p>
          <p className="text-gray-700">
            5.3. Prices may change. We will give at least 30 days' notice of any
            price change.
          </p>
          <p className="text-gray-700">
            5.4. VAT (or equivalent sales tax) will be applied where applicable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">6. Payments</h2>
          <p className="text-gray-700">
            6.1. Payment methods are set out on our website (e.g. card, Stripe,
            PayPal).
          </p>
          <p className="text-gray-700">
            6.2. If a payment fails, we may suspend access until payment is
            received.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            7. Cancellations and Termination
          </h2>
          <p className="text-gray-700">
            7.1. You may cancel your Subscription at any time via your Account
            settings. Cancellation takes effect at the end of the current
            billing period.
          </p>
          <p className="text-gray-700">
            7.2. Upon cancellation, your Account will remain accessible until
            the end of the paid term. After that, your Account and data may be
            deleted, subject to our Data Retention Policy.
          </p>
          <p className="text-gray-700">
            7.3. We may suspend or terminate your access immediately if:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">You breach these Terms.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                You fail to pay fees when due.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Your use damages or risks damaging our reputation, security, or
                other users.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            8. Intellectual Property
          </h2>
          <p className="text-gray-700">
            8.1. The Service, including its code, features, and design, is the
            exclusive property of Social Commerce Accountants Ltd.
          </p>
          <p className="text-gray-700">
            8.2. You retain ownership of your User Content. By using the
            Service, you grant us a licence to use, process, and store your User
            Content solely for the purpose of providing the Service.
          </p>
          <p className="text-gray-700">
            8.3. You must not copy, resell, reverse engineer, or otherwise
            misuse the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            9. Acceptable Use
          </h2>
          <p className="text-gray-700">
            You agree not to use the Service for unlawful, harmful, or
            fraudulent purposes, including but not limited to:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Uploading malware or attempting to disrupt the Service.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Attempting to gain unauthorised access to data or accounts.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Using the Service to provide competing services.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            10. Data Protection and Privacy
          </h2>
          <p className="text-gray-700">
            10.1. Your use of the Service is also governed by our Privacy
            Policy, available on our website.
          </p>
          <p className="text-gray-700">
            10.2. We comply with UK GDPR and relevant data protection laws.
          </p>
          <p className="text-gray-700">
            10.3. You are responsible for ensuring your use of the Service
            complies with all applicable data protection laws in your
            jurisdiction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            11. Warranties and Disclaimers
          </h2>
          <p className="text-gray-700">
            11.1. We will use reasonable care and skill in providing the
            Service.
          </p>
          <p className="text-gray-700">
            11.2. Except as expressly stated, the Service is provided "as is"
            and without warranty.
          </p>
          <p className="text-gray-700">11.3. We do not guarantee that:</p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                The Service will be uninterrupted or error-free.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                The outputs of the Service are complete or accurate.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                The Service constitutes financial, accounting, tax, or legal
                advice.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            12. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            12.1. Nothing in these Terms limits liability for death, personal
            injury, or fraud.
          </p>
          <p className="text-gray-700">
            12.2. To the maximum extent permitted by law, we are not liable for:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Loss of profits, business, or goodwill.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">Loss of data.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-3">•</span>
              <span className="text-gray-700">
                Indirect or consequential losses.
              </span>
            </li>
          </ul>
          <p className="text-gray-700">
            12.3. Our total liability under these Terms shall not exceed the
            total Subscription fees paid by you in the 12 months preceding the
            claim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            13. Confidentiality
          </h2>
          <p className="text-gray-700">
            Each party agrees to keep confidential all information of the other
            which is marked confidential or would reasonably be understood to be
            confidential.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            14. Changes to These Terms
          </h2>
          <p className="text-gray-700">
            We may update these Terms from time to time. You will be notified of
            changes, and continued use of the Service after changes take effect
            constitutes acceptance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            15. Governing Law and Jurisdiction
          </h2>
          <p className="text-gray-700">
            These Terms are governed by the laws of England and Wales. The
            courts of England and Wales have exclusive jurisdiction over any
            disputes.
          </p>
        </section>

        <section className="space-y-4 border-t pt-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Company details:
          </h3>
          <div className="text-gray-700">
            <p>Social Commerce Accountants Ltd (trading as Cazza.ai)</p>
            <p>Company Number: 13802919</p>
            <p>
              Registered Office: Unit D2, Office 2, The Maltings, Station Road,
              Sawbridgeworth, CM21 9JX
            </p>
            <p>Founder: Samuel Hoye</p>
          </div>
        </section>
      </div>
    </div>
  );
};
