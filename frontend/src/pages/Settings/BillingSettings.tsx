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
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/userStore";
import type { Subscription } from "@/types/auth";

// Minimal plans data used by this page. Replace with API-driven data as needed.
const plans: { name: string; price?: number; type: "rookie" | "master" }[] = [
  { name: "Rookie", price: 0, type: "rookie" },
  { name: "Master", price: 49, type: "master" },
];

export const BillingSettings = () => {
  const { startSubscription, unsubscribe, isLoading, fetchUserProfile } = useUser();
  const { user } = useUserStore();
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  
  const subscription = user?.subscription || null;
  
  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);
  
  // Helper function to get plan name from subscription
  const getPlanName = (sub: Subscription | null) => {
    if (!sub) return null;
    
    // First check if planType is explicitly set
    if (sub.planType) {
      return sub.planType === "master" ? "Master" : "Rookie";
    }
    
    // Fallback to interval: monthly = Rookie, yearly = Master
    if (sub.interval) {
      return sub.interval === "yearly" ? "Master" : "Rookie";
    }
    
    // Default to Rookie if neither is available
    return "Rookie";
  };
  
  // Helper function to check if subscription is active
  const isSubscriptionActive = (sub: Subscription | null) => {
    if (!sub) return false;
    return sub.status === "ACTIVE" || sub.status === "TRIAL";
  };
  
  // Helper function to check if subscription is in trial
  const isTrial = (sub: Subscription | null) => {
    if (!sub) return false;
    return sub.status === "TRIAL" && 
           sub.expiryDate && 
           new Date(sub.expiryDate) > new Date();
  };
  
  // Handlers (placeholders) - replace with real API integration
  const handleManageSubscription = async () => {
    try {
      // TODO: call backend to create/open Stripe customer portal
      console.log("Open customer portal (TODO: implement)");
      // placeholder: simulate async
      await new Promise((res) => setTimeout(res, 500));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomSubscription = async () => {
    if (!customAmount) return;
    const amount = Number(customAmount);
    if (isNaN(amount) || amount <= 0) return;
    try {
      // TODO: call API to create subscription with custom amount
      // After API call, fetch updated user profile
      await fetchUserProfile();
    } catch (err) {
      console.error(err);
    } finally {
      setShowCustomAmount(false);
    }
  };

  const handleStartTrial = async (planType: "rookie" | "master" = "rookie") => {
    try {
      const interval = planType === "rookie" ? "monthly" : "yearly";
      await startSubscription({ interval });
      // The subscription data will be updated via the user profile fetch in the hook
    } catch (err) {
      console.error(err);
    }
  };
  const planName = getPlanName(subscription);
  const isActive = isSubscriptionActive(subscription);
  const isTrialActive = isTrial(subscription);

  return (
    <div className="max-w-6xl space-y-6 mx-auto my-4">
      {/* Current Plan */}
      {subscription && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <div className="ml-4">
                <Badge>{planName || "No Plan"}</Badge>
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
                  {planName || "No Active Plan"}
                </h3>
                {isTrialActive ? (
                  <p className="text-accent-foreground/70">
                    Free trial active • Ends:{" "}
                    {subscription.expiryDate && new Date(subscription.expiryDate).toLocaleDateString()}
                  </p>
                ) : subscription.status === "ACTIVE" ? (
                  <p className="text-accent-foreground/70">
                    {subscription.customAmount
                      ? `£${(subscription.customAmount / 100).toFixed(2)}/${subscription.interval || "month"} • `
                      : ""}
                    {subscription.expiryDate
                      ? `Next billing: ${new Date(subscription.expiryDate).toLocaleDateString()}`
                      : "Active subscription"}
                    {subscription.autoRenew ? " • Auto-renew enabled" : " • Auto-renew disabled"}
                  </p>
                ) : subscription.status === "CANCELED" ? (
                  <p className="text-accent-foreground/70">
                    Subscription canceled
                    {subscription.expiryDate && ` • Expires: ${new Date(subscription.expiryDate).toLocaleDateString()}`}
                  </p>
                ) : (
                  <p className="text-accent-foreground/70">
                    No active subscription
                  </p>
                )}
              </div>
              <Badge
                variant={
                  subscription.status === "ACTIVE"
                    ? "default"
                    : subscription.status === "TRIAL"
                    ? "secondary"
                    : "outline"
                }
              >
                {subscription.status === "ACTIVE"
                  ? "Active"
                  : subscription.status === "TRIAL"
                  ? "Trial"
                  : subscription.status === "CANCELED"
                  ? "Canceled"
                  : "No Plan"}
              </Badge>
            </div>
            <div className="mt-4 flex gap-2">
              {subscription.status === "ACTIVE" && (
                <>
                  <Button
                    onClick={handleManageSubscription}
                    disabled={isLoading}
                    variant="outline"
                    className="flex-1"
                  >
                    Manage Subscription
                  </Button>
                  <Button
                    onClick={unsubscribe}
                    disabled={isLoading}
                    variant="destructive"
                    className="flex-1"
                  >
                    Unsubscribe
                  </Button>
                </>
              )}
              {subscription.status === "CANCELED" && (
                <Button
                  disabled={true}
                  variant="outline"
                  className="w-full"
                >
                  Subscription Canceled
                </Button>
              )}
            </div>
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
            currentPlan={planName || null}
            loading={isLoading}
            showActions={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {plans.map((plan) => {
              const isCurrentPlan = planName === plan.name;
              const isPlanActive = isCurrentPlan && isActive;
              
              return (
                <div key={plan.name}>
                  <div className="space-y-2">
                    {isTrialActive && subscription?.planType === plan.type ? (
                      <Button variant="secondary" className="w-full" disabled>
                        Trial Active • Ends:{" "}
                        {subscription.expiryDate && new Date(subscription.expiryDate).toLocaleDateString()}
                      </Button>
                    ) : isPlanActive ? (
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowCustomAmount(!showCustomAmount)}
                          className="w-full"
                        >
                          Set {plan.type === "rookie" ? "Monthly" : "Yearly"} Amount
                        </Button>
                        {showCustomAmount && (
                          <div className="space-y-2">
                            <Input
                              type="number"
                              placeholder={`Enter amount (£) ${plan.type === "rookie" ? "per month" : "per year"}`}
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              min="1"
                              step="0.01"
                            />
                            <Button
                              onClick={handleCustomSubscription}
                              disabled={isLoading || !customAmount}
                              className="w-full"
                            >
                              Subscribe for £{customAmount}/{plan.type === "rookie" ? "month" : "year"}
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleStartTrial(plan.type)}
                        disabled={isLoading}
                      >
                        Subscribe now
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management */}
      {subscription && subscription.status === "ACTIVE" && (
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
                disabled={isLoading}
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
