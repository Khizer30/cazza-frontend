import { useEffect } from "react";

export const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 flex items-center justify-center">
      <div className="relative bg-white max-w-4xl mx-4 w-full border-[10px] border-gray-800 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.1)] p-10">
        {/* Decorative inner border */}
        <div className="absolute inset-3 border-[3px] border-gray-500 rounded-lg pointer-events-none" />

        <h1 className="text-4xl font-serif text-gray-900 mb-8 text-center uppercase tracking-wide">Cookie Policy</h1>

        <div className="space-y-10 text-gray-800 leading-relaxed max-w-2xl mx-auto">
          <section className="space-y-2 text-center">
            <p>
              <strong>Organisation:</strong> Social Commerce Accountants Ltd (SCA)
            </p>
            <p>
              <strong>Effective Date:</strong> 27th September 2025
            </p>
          </section>

          {/* 1. Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Social Commerce Accountants Ltd ("SCA," "we," "our," "us") uses cookies
              and similar technologies on our website and web application ("Services"). It should be read alongside our{" "}
              <a href="/privacy-policy" className="underline hover:text-gray-900">
                Privacy Policy
              </a>
              .
            </p>
            <p>By continuing to use our Services, you consent to the use of cookies in accordance with this policy.</p>
          </section>

          {/* 2. What Are Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">2. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website or use an application. They
              help us improve functionality, measure performance, and enhance your user experience.
            </p>
            <p>We also use similar technologies such as local storage and pixels.</p>
          </section>

          {/* 3. Types of Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">3. Types of Cookies We Use</h2>

            <div className="space-y-4">
              {/* 3.1 Strictly Necessary */}
              <div>
                <h3 className="text-xl font-semibold font-serif text-gray-900">3.1 Strictly Necessary Cookies</h3>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Required for the Services to function (e.g. authentication, account login).</li>
                  <li>Cannot be disabled.</li>
                </ul>
              </div>

              {/* 3.2 Performance & Analytics */}
              <div>
                <h3 className="text-xl font-semibold font-serif text-gray-900">3.2 Performance & Analytics Cookies</h3>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Collect information about how visitors use our Services (e.g. which pages are visited).</li>
                  <li>Help us improve functionality and usability.</li>
                  <li>We use tools such as Google Analytics.</li>
                </ul>
              </div>

              {/* 3.3 Functional */}
              <div>
                <h3 className="text-xl font-semibold font-serif text-gray-900">3.3 Functional Cookies</h3>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Allow the Services to remember your preferences (e.g. language, settings).</li>
                  <li>Enhance personalisation.</li>
                </ul>
              </div>

              {/* 3.4 Advertising & Third-Party */}
              <div>
                <h3 className="text-xl font-semibold font-serif text-gray-900">
                  3.4 Advertising & Third-Party Cookies
                </h3>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Used to deliver relevant content or marketing.</li>
                  <li>May be placed by third-party platforms (e.g. TikTok, Shopify integrations).</li>
                  <li>You can opt out where required by law.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. How We Use Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">4. How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enable secure login and session management.</li>
              <li>Analyse usage patterns to improve our Services.</li>
              <li>Store user preferences.</li>
              <li>Support integrations with third-party platforms.</li>
            </ul>
          </section>

          {/* 5. Managing Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">5. Managing Cookies</h2>
            <p>
              You can manage or disable cookies via your browser settings. Please note that disabling certain cookies
              may impact the functionality of our Services.
            </p>
            <p>For more information on managing cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chrome: https://support.google.com/chrome/answer/95647</li>
              <li>Safari: https://support.apple.com/en-gb/guide/safari/sfri11471/mac</li>
              <li>Firefox: https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop</li>
            </ul>
          </section>

          {/* 6. Updates to This Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with the
              updated effective date.
            </p>
          </section>

          {/* 7. Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">7. Contact</h2>
            <p>If you have any questions about our use of cookies, please contact:</p>
            <div className="space-y-2">
              <p>
                <strong>Data Protection Officer (DPO):</strong>
              </p>
              <p>Samuel Hoye</p>
              <p>Social Commerce Accountants Ltd</p>
              <p>Unit D2, Office 2, The Maltings, Sawbridgeworth, CM21 9JX</p>
              <p>
                Email:{" "}
                <a href="mailto:sam@socialcommerceaccountants.com" className="underline hover:text-gray-900">
                  sam@socialcommerceaccountants.com
                </a>
              </p>
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

export default CookiePolicy;
