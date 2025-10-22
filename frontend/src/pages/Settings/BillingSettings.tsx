import { PlanCards } from "@/components/ClientComponents/PlanCards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// Minimal plans data used by this page. Replace with API-driven data as needed.
const plans: { name: string; price?: number; type: "rookie" | "master" }[] = [
  { name: "Rookie", price: 0, type: "rookie" },
  { name: "Master", price: 49, type: "master" },
];

export const BillingSettings = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  // Handlers (placeholders) - replace with real API integration
  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      // TODO: call backend to create/open Stripe customer portal
      console.log("Open customer portal (TODO: implement)");
      // placeholder: simulate async
      await new Promise((res) => setTimeout(res, 500));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubscription = async () => {
    if (!customAmount) return;
    const amount = Number(customAmount);
    if (isNaN(amount) || amount <= 0) return;
    setLoading(true);
    try {
      // TODO: call API to create subscription with custom amount
      const custom_amount_pence = Math.round(amount * 100);
      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

      setSubscription((s: any) => ({
        ...(s || {}),
        subscribed: true,
        custom_amount: custom_amount_pence,
        subscription_end: subscriptionEnd.toISOString(),
        subscription_tier: s?.subscription_tier || "Rookie",
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setShowCustomAmount(false);
    }
  };

  const handleStartTrial = async () => {
    setLoading(true);
    try {
      // TODO: call backend to start trial
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7); // 7-day trial

      setSubscription((s: any) => ({
        ...(s || {}),
        subscribed: false,
        subscription_tier: "Rookie",
        trial_end: trialEnd.toISOString(),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookCall = () => {
    // TODO: implement booking flow (open calendar, external link, or contact form)
    console.log("Book a call (TODO: implement)");
    // placeholder: open mailto as a minimal UX
    window.open("mailto:sales@example.com?subject=Book%20a%20demo", "_blank");
  };
  return (
    <div className="max-w-6xl space-y-6 m-4">
      {/* Current Plan */}
      {subscription && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <div className="ml-4">
                <Badge>{subscription.subscription_tier || "No Plan"}</Badge>
              </div>
            </div>
            <CardDescription>
              Your subscription status and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
              <div>
                <h3 className="font-semibold text-lg text-accent-foreground">
                  {subscription.subscription_tier || "No Active Plan"}
                </h3>
                {subscription.trial_end &&
                new Date(subscription.trial_end) > new Date() &&
                !subscription.subscribed ? (
                  <p className="text-accent-foreground/70">
                    Free trial active • Ends:{" "}
                    {new Date(subscription.trial_end).toLocaleDateString()}
                  </p>
                ) : subscription.subscribed ? (
                  <p className="text-accent-foreground/70">
                    {subscription.custom_amount
                      ? `£${(subscription.custom_amount / 100).toFixed(
                          2
                        )}/month • Next billing: ${new Date(
                          subscription.subscription_end
                        ).toLocaleDateString()}`
                      : `Next billing: ${new Date(
                          subscription.subscription_end
                        ).toLocaleDateString()}`}
                  </p>
                ) : (
                  <p className="text-accent-foreground/70">
                    No active subscription
                  </p>
                )}
              </div>
              <Badge
                variant={
                  subscription.subscribed
                    ? "default"
                    : subscription.trial_end &&
                      new Date(subscription.trial_end) > new Date()
                    ? "secondary"
                    : "outline"
                }
              >
                {subscription.subscribed
                  ? "Active"
                  : subscription.trial_end &&
                    new Date(subscription.trial_end) > new Date()
                  ? "Trial"
                  : "No Plan"}
              </Badge>
            </div>
            {subscription.subscribed && (
              <div className="mt-4">
                <Button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className="w-full"
                >
                  Manage Subscription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlanCards
            currentPlan={subscription?.subscription_tier}
            loading={loading}
            showActions={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {plans.map((plan) => (
              <div key={plan.name}>
                {plan.type === "rookie" ? (
                  <div className="space-y-2">
                    {subscription?.trial_end &&
                    new Date(subscription.trial_end) > new Date() &&
                    !subscription?.subscribed ? (
                      <Button variant="secondary" className="w-full" disabled>
                        Trial Active • Ends:{" "}
                        {new Date(subscription.trial_end).toLocaleDateString()}
                      </Button>
                    ) : subscription?.subscribed ? (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowCustomAmount(!showCustomAmount)}
                          className="w-full"
                        >
                          Set Monthly Amount
                        </Button>
                        {showCustomAmount && (
                          <div className="space-y-2">
                            <Input
                              type="number"
                              placeholder="Enter amount (£)"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              min="1"
                              step="0.01"
                            />
                            <Button
                              onClick={handleCustomSubscription}
                              disabled={loading || !customAmount}
                              className="w-full"
                            >
                              Subscribe for £{customAmount}/month
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={handleStartTrial}
                        disabled={loading}
                      >
                        Start free trial →
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleBookCall}>
                    Book a call →
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management */}
      {subscription?.subscribed && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
            <CardDescription>
              Manage your subscription, payment methods, and billing history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={handleManageSubscription}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Open Stripe Customer Portal
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Update payment methods, view invoices, and manage your
                subscription
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
