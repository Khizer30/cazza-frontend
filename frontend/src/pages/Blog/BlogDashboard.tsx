import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPost {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  authors: {
    name: string;
    avatar?: string;
  }[];
  highlights?: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "cazza-ai-launch",
    date: "December 18th, 2025",
    title: "Cazza AI Launch",
    excerpt:
      "Cazza AI is now available. Connect your Amazon, TikTok Shop, Shopify & Xero accounts securely and get instant financial insights powered by OpenAI.",
    authors: [
      { name: "James Wilson", avatar: "" },
      { name: "Sarah Chen", avatar: "" },
    ],
    highlights: [
      "Multi-platform integration for Amazon, TikTok Shop, Shopify & Xero",
      "AI-powered financial insights in seconds",
      "Bank-level security with read-only access",
    ],
  },
  {
    id: "ecommerce-accounting-tips",
    date: "December 11th, 2025",
    title: "E-commerce Accounting Tips: December 2025",
    excerpt:
      "Essential accounting practices for e-commerce sellers. Learn how to streamline your bookkeeping and prepare for tax season with confidence.",
    authors: [
      { name: "Emma Roberts", avatar: "" },
      { name: "Michael Brown", avatar: "" },
    ],
  },
  {
    id: "vat-compliance-guide",
    date: "December 3rd, 2025",
    title: "VAT Compliance Guide for UK Sellers",
    excerpt:
      "A comprehensive guide to VAT registration, quarterly returns, and compliance requirements for UK-based e-commerce businesses.",
    authors: [{ name: "David Thompson", avatar: "" }],
  },
  {
    id: "tiktok-shop-reconciliation",
    date: "October 21st, 2025",
    title: "TikTok Shop Reconciliation",
    excerpt:
      "Master TikTok Shop payout reconciliation with our step-by-step guide. Understand fees, refunds, and how to match payouts with your sales data.",
    authors: [
      { name: "Lisa Wang", avatar: "" },
      { name: "Tom Harris", avatar: "" },
    ],
  },
  {
    id: "amazon-seller-financial-planning",
    date: "October 9th, 2025",
    title: "Amazon Seller Financial Planning",
    excerpt:
      "Financial planning strategies for Amazon sellers. Learn about inventory management, cash flow optimization, and profit margin analysis.",
    authors: [
      { name: "Rachel Green", avatar: "" },
      { name: "Chris Taylor", avatar: "" },
    ],
  },
  {
    id: "multi-channel-selling",
    date: "August 18th, 2025",
    title: "Multi-Channel Selling Success",
    excerpt:
      "How to successfully manage finances across multiple e-commerce platforms. Tips for unified reporting and cross-channel analytics.",
    authors: [{ name: "Andrew Miller", avatar: "" }],
  },
];

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

export const BlogDashboard = () => {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            The latest Cazza news
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Stay updated with the latest features, tips, and insights for
            e-commerce sellers and accountants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group bg-card"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {post.authors.slice(0, 3).map((author, idx) => (
                      <Avatar
                        key={idx}
                        className="w-8 h-8 border-2 border-card"
                      >
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback
                          className={`text-xs text-white ${getAvatarColor(author.name)}`}
                        >
                          {getAuthorInitials(author.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {post.authors.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                        +{post.authors.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                {post.highlights && (
                  <ul className="space-y-1">
                    {post.highlights.slice(0, 3).map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  variant="ghost"
                  className="w-full mt-4 border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
