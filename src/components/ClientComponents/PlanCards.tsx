import { Check } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const plans = [
  {
    name: "Rookie",
    price: "Free 30-day trial",
    period: "",
    subtitle: "Then pay what you think it's worth.",
    description: "Perfect for founders who want instant clarity without the jargon.",
    features: [
      "AI assistant trained in UK tax and e-commerce",
      "Ask anything, like:",
      '"Do I need to register for VAT yet?"',
      '"Why doesn\'t my Amazon payout match my sales report?"',
      '"What\'s my net margin on TikTok vs Amazon?"',
      "Unlimited AI searches + full chat history",
      "Connect Amazon Seller Central, Shopify, TikTok Shop, Xero",
      "Personalised dashboard with live revenue, P&L, expenses",
      "Invite your team and create dedicated finance channels (like Slack, built for your books)"
    ],
    pricing: {
      trial: "Free for 30 days",
      after: "Afterwards: Pay what you think it's worth, monthly."
    },
    type: "rookie"
  },
  {
    name: "Master",
    price: "From £150/month",
    period: "(ex VAT)",
    subtitle: "",
    description: "For growing brands ready for expert support.",
    features: [
      "Everything in Rookie, plus:",
      "Direct live chat with your accountant",
      "Forward AI answers for human review",
      "Full bookkeeping and bank reconciliations in Xero",
      "Year-end accounts and corporation tax filings",
      "VAT registration and quarterly/monthly VAT returns",
      "Payroll setup and management (including RTI and pensions)",
      "Director tax efficiency planning",
      "Monthly reconciliations including stock, payment gateways, deferred income, etc",
      "Xero integration setup with any eCommerce software"
    ],
    type: "master"
  }
];

interface PlanCardsProps {
  onSelectPlan?: (planType: string) => void;
  selectedPlan?: string | null;
  currentPlan?: string | null;
  loading?: boolean;
  showActions?: boolean;
}

export const PlanCards = ({
  onSelectPlan,
  selectedPlan,
  currentPlan,
  loading = false,
  showActions = true
}: PlanCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-lg border p-6 flex flex-col h-full ${
            currentPlan === plan.name
              ? "border-primary bg-primary/5"
              : selectedPlan === plan.type
                ? "border-primary bg-primary/5"
                : "border-border"
          }`}
        >
          {currentPlan === plan.name && (
            <Badge className="absolute -top-2 left-4" variant="default">
              Current Plan
            </Badge>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

            <div className="mb-3">
              <div className="text-lg font-semibold">{plan.price}</div>
              {plan.period && <div className="text-sm text-muted-foreground">{plan.period}</div>}
              {plan.subtitle && <div className="text-sm text-muted-foreground mt-1">{plan.subtitle}</div>}
            </div>

            {plan.description && <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>}

            {plan.pricing && (
              <div className="space-y-1 pt-2 border-t border-border mb-4">
                <p className="text-xs text-muted-foreground">
                  <strong>{plan.pricing.trial}</strong>
                </p>
                <p className="text-xs text-muted-foreground">{plan.pricing.after}</p>
              </div>
            )}

            <p className="text-sm font-medium mb-3">Includes:</p>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                {feature.startsWith('"') || feature.includes("Everything in") || feature.includes("Ask anything") ? (
                  <span className="text-muted-foreground ml-5">{feature}</span>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </>
                )}
              </li>
            ))}
          </ul>

          {showActions && onSelectPlan && (
            <Button
              className="w-full"
              onClick={() => onSelectPlan(plan.type)}
              disabled={loading || currentPlan === plan.name}
              variant={selectedPlan === plan.type ? "default" : "outline"}
            >
              {currentPlan === plan.name ? "Current Plan" : plan.type === "master" ? "Book call" : "Subscribe now"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
