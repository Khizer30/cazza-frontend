import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AmazonSellers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 flex items-center justify-center">
      <div className="relative bg-white max-w-4xl mx-4 w-full border-[10px] border-gray-800 rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.1)] p-10 text-center">
        {/* Decorative inner border */}
        <div className="absolute inset-3 border-[3px] border-gray-500 rounded-lg pointer-events-none"></div>

        <h1 className="text-5xl font-serif text-gray-900 mb-4 tracking-wide uppercase">Cazza for Amazon Sellers</h1>
        <p className="text-gray-700 italic mb-8 text-lg">
          Cazza connects directly to Amazon’s official Selling Partner API (SP-API) to turn your data into clear,
          real-time financial insights. You’ll always know what’s really happening behind your payouts — without
          spreadsheets or guesswork.
        </p>

        <div className="text-left space-y-6 max-w-2xl mx-auto font-light text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold font-serif text-gray-900 mb-2">What Cazza Does</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Orders &amp; Refunds</strong> — track sales, returns, and reimbursements.
              </li>
              <li>
                <strong>Settlements &amp; Payouts</strong> — understand every payment cycle.
              </li>
              <li>
                <strong>Fees &amp; FBA Costs</strong> — see fulfilment, storage, and ad spend clearly.
              </li>
              <li>
                <strong>Performance &amp; Profit Metrics</strong> — uncover your true margins.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold font-serif text-gray-900 mb-2">Ask Anything</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>“Why doesn’t my Amazon payout match my sales?”</li>
              <li>“What’s my FBA fee percentage this month?”</li>
              <li>“How much profit did I make on Amazon UK in Q3?”</li>
              <li>“Am I close to the VAT threshold?”</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold font-serif text-gray-900 mb-2">Data Protection</h2>
            <p>
              We follow Amazon’s Acceptable Use Policy and Data Protection Policy in full. Cazza does not share, resell,
              or combine your Amazon data with any non-Amazon source. Information is stored using bank-grade encryption,
              and deleted immediately if you disconnect your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold font-serif text-gray-900 mb-2">Built by Experts</h2>
            <p>
              Cazza was built by chartered accountants who specialise in e-commerce. It’s the missing layer between your
              Seller Central data and your business decisions — designed to give founders instant clarity without
              replacing their accountants.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <Button
            onClick={() => navigate("/signup")}
            className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
          >
            Start your free trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-gray-800 text-gray-900 hover:bg-gray-100 transition-all duration-300"
          >
            Back to Home
          </Button>
        </div>

        {/* Signature / Footer */}
        <div className="mt-12 text-gray-700 italic text-sm">
          <p>Issued by Cazza • Empowering Amazon Sellers Worldwide</p>
          <div className="mt-2 border-t border-gray-600 w-40 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AmazonSellers;
