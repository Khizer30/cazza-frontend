import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPostContent {
  id: string;
  date: string;
  title: string;
  postedBy: {
    name: string;
    handle: string;
    avatar?: string;
  }[];
  sections: {
    heading?: string;
    body: string;
    image?: string;
    imageAlt?: string;
    codeBlock?: {
      title: string;
      commands: string[];
    };
  }[];
}

const blogPostsContent: Record<string, BlogPostContent> = {
  "cazza-ai-launch": {
    id: "cazza-ai-launch",
    date: "Thursday, December 18th 2025",
    title: "Cazza AI Launch",
    postedBy: [
      { name: "James Wilson", handle: "@jameswilson", avatar: "" },
      { name: "Sarah Chen", handle: "@sarahchen", avatar: "" },
    ],
    sections: [
      {
        body: "Cazza AI focuses on providing instant financial insights for e-commerce sellers, with seamless integration to major platforms and accounting software.",
      },
      {
        body: "• Multi-platform integration for Amazon, TikTok Shop, Shopify & Xero",
      },
      {
        body: "• AI-powered financial insights in seconds",
      },
      {
        body: "• Bank-level security with read-only access",
      },
      {
        body: "• Team collaboration with shared channels",
      },
      {
        heading: "Get Started Today",
        body: "Start your free 30-day trial and experience the power of AI-driven financial insights for your e-commerce business.",
        codeBlock: {
          title: "terminal",
          commands: [
            "# Sign up for free trial",
            "Visit https://cazza.ai/signup",
            "",
            "# Connect your platforms",
            "Amazon Seller Central, TikTok Shop, Shopify, Xero",
            "",
            "# Start asking questions",
            "\"What's my profit margin on TikTok Shop?\"",
          ],
        },
      },
      {
        heading: "Multi-Platform Integration",
        body: "Cazza seamlessly connects to Amazon Seller Central, TikTok Shop, Shopify, and Xero. All connections use official APIs with bank-level encryption. We never alter your data – read-only access ensures your accounts remain secure.",
        image: "/after.png",
        imageAlt: "Cazza Dashboard showing multi-platform integration",
      },
      {
        heading: "AI-Powered Insights",
        body: "Ask plain-English questions and get instant answers. Our AI is trained on UK tax laws and e-commerce best practices, providing accurate financial insights tailored to your business needs. Whether you're asking about VAT obligations, profit margins, or payout reconciliation, Cazza has you covered.",
      },
      {
        heading: "Team Collaboration",
        body: "Invite your team members, accountants, or business partners to shared channels. Collaborate on financial decisions with real-time data and AI-powered insights accessible to everyone who needs them.",
      },
    ],
  },
  "ecommerce-accounting-tips": {
    id: "ecommerce-accounting-tips",
    date: "Wednesday, December 11th 2025",
    title: "E-commerce Accounting Tips: December 2025",
    postedBy: [
      { name: "Emma Roberts", handle: "@emmaroberts", avatar: "" },
      { name: "Michael Brown", handle: "@michaelbrown", avatar: "" },
    ],
    sections: [
      {
        body: "Essential accounting practices for e-commerce sellers. Learn how to streamline your bookkeeping and prepare for tax season with confidence.",
      },
      {
        heading: "Keep Your Records Organized",
        body: "Maintain separate records for each sales platform. This makes reconciliation easier and ensures you can track performance across channels. Use cloud-based accounting software like Xero to automate data entry and reduce manual errors.",
      },
      {
        heading: "Understand Your Fees",
        body: "Each platform has different fee structures. Amazon charges referral fees, FBA fees, and storage fees. TikTok Shop has commission rates and payment processing fees. Shopify charges transaction fees unless you use Shopify Payments. Track these fees carefully to understand your true profit margins.",
      },
      {
        heading: "Prepare for VAT",
        body: "If you're approaching the £90,000 VAT threshold, start preparing now. Consider the pros and cons of voluntary registration and choose between standard and flat-rate schemes based on your business model.",
      },
      {
        heading: "Year-End Checklist",
        body: "• Reconcile all bank accounts\n• Review outstanding invoices\n• Check stock valuations\n• Gather receipts for all business expenses\n• Review director loans and dividends\n• Prepare for corporation tax payment",
      },
    ],
  },
  "vat-compliance-guide": {
    id: "vat-compliance-guide",
    date: "Wednesday, December 3rd 2025",
    title: "VAT Compliance Guide for UK Sellers",
    postedBy: [{ name: "David Thompson", handle: "@davidthompson", avatar: "" }],
    sections: [
      {
        body: "A comprehensive guide to VAT registration, quarterly returns, and compliance requirements for UK-based e-commerce businesses.",
      },
      {
        heading: "When to Register for VAT",
        body: "You must register for VAT if your taxable turnover exceeds £90,000 in any 12-month period, or if you expect it to exceed this threshold in the next 30 days alone. Voluntary registration is possible below this threshold and can offer advantages for B2B sellers.",
      },
      {
        heading: "Choosing Your VAT Scheme",
        body: "The Standard VAT Scheme requires you to charge and reclaim VAT at the appropriate rates. The Flat Rate Scheme simplifies reporting by applying a single percentage to your gross turnover, but limits VAT reclaim to capital assets over £2,000.",
      },
      {
        heading: "Making Tax Digital",
        body: "All VAT-registered businesses must use MTD-compatible software to keep digital records and submit returns. Xero, QuickBooks, and Sage are popular choices that integrate well with e-commerce platforms.",
      },
      {
        heading: "Common VAT Mistakes",
        body: "• Miscalculating the VAT threshold (use rolling 12 months, not calendar year)\n• Forgetting to account for marketplace fees in VAT calculations\n• Not keeping proper records of zero-rated and exempt supplies\n• Missing the registration deadline (you have 30 days after exceeding threshold)",
      },
    ],
  },
  "tiktok-shop-reconciliation": {
    id: "tiktok-shop-reconciliation",
    date: "Tuesday, October 21st 2025",
    title: "TikTok Shop Reconciliation",
    postedBy: [
      { name: "Lisa Wang", handle: "@lisawang", avatar: "" },
      { name: "Tom Harris", handle: "@tomharris", avatar: "" },
    ],
    sections: [
      {
        body: "Master TikTok Shop payout reconciliation with our step-by-step guide. Understand fees, refunds, and how to match payouts with your sales data.",
      },
      {
        heading: "Understanding TikTok Shop Payouts",
        body: "TikTok Shop processes payouts based on completed orders. The standard payout cycle is every 7 days for most sellers, with funds released after the order confirmation period ends. Payouts include deductions for commissions, affiliate fees, and any platform promotions.",
      },
      {
        heading: "Key Deductions to Track",
        body: "• Commission: Typically 5% of order value\n• Affiliate commission: Variable, set by seller\n• Payment processing: Included in commission\n• Promotional discounts: Platform-funded vs seller-funded\n• Refunds: Deducted from subsequent payouts",
      },
      {
        heading: "Reconciliation Process",
        body: "Download your settlement report from TikTok Shop Seller Center. Match each payout amount to corresponding orders, accounting for refunds and fees. Use Cazza to automate this process and get instant insights into your TikTok Shop profitability.",
      },
      {
        heading: "Common Reconciliation Issues",
        body: "Timing differences between order confirmation and payout can cause confusion. Partial refunds may span multiple payout periods. Keep detailed records and use the order-level settlement data to track discrepancies.",
      },
    ],
  },
  "amazon-seller-financial-planning": {
    id: "amazon-seller-financial-planning",
    date: "Thursday, October 9th 2025",
    title: "Amazon Seller Financial Planning",
    postedBy: [
      { name: "Rachel Green", handle: "@rachelgreen", avatar: "" },
      { name: "Chris Taylor", handle: "@christaylor", avatar: "" },
    ],
    sections: [
      {
        body: "Financial planning strategies for Amazon sellers. Learn about inventory management, cash flow optimization, and profit margin analysis.",
      },
      {
        heading: "Cash Flow Management",
        body: "Amazon's 14-day payment cycle means cash is tied up longer than direct sales. Plan your inventory purchases around expected payouts. Consider Amazon Lending or external financing for growth periods, but calculate the true cost including interest.",
      },
      {
        heading: "Inventory Planning",
        body: "Use historical sales data to forecast demand. Account for lead times from suppliers and Amazon's receiving process. Long-term storage fees kick in after 365 days – plan inventory levels to minimize these charges while avoiding stockouts.",
      },
      {
        heading: "Fee Optimization",
        body: "Review your product dimensions and weights regularly. Small changes can move products between fee tiers. Consider FBM for low-velocity items to avoid storage fees. Use the FBA Revenue Calculator for each product to understand true profitability.",
      },
      {
        heading: "Tax Planning",
        body: "Set aside 19-25% of profits for corporation tax. Consider dividend vs salary extraction for tax efficiency. Plan major expenses before year-end to reduce taxable profits. Keep records of all allowable business expenses.",
      },
    ],
  },
  "multi-channel-selling": {
    id: "multi-channel-selling",
    date: "Monday, August 18th 2025",
    title: "Multi-Channel Selling Success",
    postedBy: [{ name: "Andrew Miller", handle: "@andrewmiller", avatar: "" }],
    sections: [
      {
        body: "How to successfully manage finances across multiple e-commerce platforms. Tips for unified reporting and cross-channel analytics.",
      },
      {
        heading: "Centralized Financial Management",
        body: "Use a single accounting system as your source of truth. Connect all sales channels to Xero or similar software. This provides a unified view of your business performance and simplifies tax compliance.",
      },
      {
        heading: "Channel-Specific Tracking",
        body: "While centralizing data, maintain channel-specific tracking for performance analysis. Use tracking codes or separate nominal codes for each platform. This helps identify which channels are most profitable after accounting for all fees and costs.",
      },
      {
        heading: "Inventory Synchronization",
        body: "Avoid overselling by syncing inventory across platforms. Tools like Linnworks or Sellbrite can automate this process. Factor in platform-specific lead times when calculating available stock.",
      },
      {
        heading: "Unified Reporting with Cazza",
        body: "Cazza connects to all your platforms and provides unified insights. Ask questions like \"Which platform has the best profit margin?\" or \"What's my total revenue across all channels this month?\" to get instant answers without manual data compilation.",
      },
    ],
  },
};

const getAuthorInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

export const BlogDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const post = slug ? blogPostsContent[slug] : null;

  if (!post) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/client/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 -ml-4"
          onClick={() => navigate("/client/blog")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time>{post.date}</time>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">Posted by</span>
              <div className="flex flex-wrap gap-6">
                {post.postedBy.map((author, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={author.avatar} alt={author.name} />
                      <AvatarFallback
                        className={`text-sm text-white ${getAvatarColor(author.name)}`}
                      >
                        {getAuthorInitials(author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {author.handle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <div className="border-t border-border pt-8" />

          <div className="prose prose-invert max-w-none space-y-8">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-bold text-foreground">
                    {section.heading}
                  </h2>
                )}

                <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>

                {section.codeBlock && (
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">{">"}_ </span>
                        <span>{section.codeBlock.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            section.codeBlock!.commands.join("\n")
                          );
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </Button>
                    </div>
                    <div className="p-4 font-mono text-sm space-y-1">
                      {section.codeBlock.commands.map((line, lineIdx) => (
                        <div key={lineIdx}>
                          {line.startsWith("#") ? (
                            <span className="text-muted-foreground">
                              {line}
                            </span>
                          ) : line.startsWith("npx") ||
                            line.startsWith("npm") ? (
                            <>
                              <span className="text-green-400">
                                {line.split(" ")[0]}
                              </span>
                              <span className="text-purple-400">
                                {" "}
                                {line.split(" ").slice(1).join(" ")}
                              </span>
                            </>
                          ) : line.startsWith("Visit") ? (
                            <span className="text-purple-400">{line}</span>
                          ) : line.startsWith('"') ? (
                            <span className="text-primary">{line}</span>
                          ) : (
                            <span className="text-foreground">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.image && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={section.image}
                      alt={section.imageAlt || "Blog post image"}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground">
                Try Cazza free for 30 days. No credit card required.
              </p>
            </div>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
