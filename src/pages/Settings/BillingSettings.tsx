import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ToastProvider";
import type { SubscriptionDetails } from "@/types/auth";
import { SettingsSidebar } from "@/components/SettingsSidebar";
import { Loader2 } from "lucide-react";

export const BillingSettings = () => {
  const { getSubscription, startSubscription, unsubscribe, isLoading, fetchUserProfile } =
    useUser();
  const { user } = useUserStore();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const hasProcessedMessage = useRef(false);
  const hasFetchedSubscription = useRef(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  useEffect(() => {
    if (hasFetchedSubscription.current) return;
    
    const fetchSubscription = async () => {
      try {
        hasFetchedSubscription.current = true;
        setLoadingSubscription(true);
        const details = await getSubscription();
        if (details) {
          setSubscriptionDetails(details);
        }
      } catch (error: any) {
        // Handle 403 Forbidden gracefully for team members
        if (error?.response?.status === 403) {
          // Team members don't have access to billing - this is expected
          hasFetchedSubscription.current = true;
        } else {
          console.error("Failed to fetch subscription details:", error);
          hasFetchedSubscription.current = false;
        }
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, []);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message && !hasProcessedMessage.current) {
      hasProcessedMessage.current = true;

      if (message === "success") {
        showToast(
          "Payment successful! Your subscription is now active.",
          "success"
        );
      } else {
        showToast("Payment failed. Please try again.", "error");
      }

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      fetchUserProfile();
      getSubscription().then((details) => {
        if (details) {
          setSubscriptionDetails(details);
        }
      }).catch(() => {
        hasFetchedSubscription.current = false;
      });
    }
  }, [searchParams, showToast, fetchUserProfile]);

  const handleStartSubscription = async () => {
    try {
      await startSubscription({ interval: "monthly" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribe();
      hasFetchedSubscription.current = false;
      const details = await getSubscription();
      if (details) {
        setSubscriptionDetails(details);
        hasFetchedSubscription.current = true;
      }
    } catch (err) {
      console.error(err);
      hasFetchedSubscription.current = false;
    }
  };

  const isActive = subscriptionDetails?.status === "ACTIVE";
  const isCanceled = subscriptionDetails?.cancelAtPeriodEnd === true;
  const hasNoSubscription = !subscriptionDetails || (subscriptionDetails.status !== "ACTIVE" && !subscriptionDetails.hasStripeSubscription);
  // OWNER has ownerId = null OR role = "OWNER"
  // Team member has ownerId set (not null)
  const isOwner = user?.ownerId === null || user?.role?.toUpperCase() === "OWNER";
  const isTeamMember = !isOwner;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <SettingsSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl space-y-6 mx-auto my-4 p-4 md:p-6">
          {loadingSubscription ? (
            <Card>
              <CardContent className="p-12">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              </CardContent>
            </Card>
          ) : isTeamMember ? (
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Billing is managed by the team owner. Please contact your team owner for subscription details.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : hasNoSubscription ? (
            <Card className="border-2">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">Subscribe to Owner Seat</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold mb-1">£100.00</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                <CardDescription className="text-base mt-4">
                  Get access to all features and manage your e-commerce business efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">AI Chat Assistant</h4>
                        <p className="text-sm text-muted-foreground">Ask questions about your sales, profit margins, VAT threshold, and get instant answers. Unlimited AI searches with full chat history.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Platform Connections</h4>
                        <p className="text-sm text-muted-foreground">Connect Amazon Seller Central, Shopify, TikTok Shop, and Xero to sync your sales and financial data in real-time.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Financial Dashboard</h4>
                        <p className="text-sm text-muted-foreground">View live revenue, profit & loss statements, expenses, and performance metrics across all your connected platforms.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Team Finance Channels</h4>
                        <p className="text-sm text-muted-foreground">Create dedicated finance channels for your team, invite members, and collaborate on financial discussions with real-time messaging.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        You will be redirected to our secure checkout page powered by Stripe
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your subscription will be activated immediately after successful payment
                      </p>
                    </div>
                    <Button
                      onClick={handleStartSubscription}
                      disabled={isLoading}
                      className="mx-auto min-w-[200px]"
                      size="lg"
                    >
                      {isLoading ? "Processing..." : "Subscribe Now"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : subscriptionDetails && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription className="mt-1">
                      Your subscription status and billing information
                    </CardDescription>
                  </div>
                  <div className="ml-4">
                    <Badge 
                      variant={isActive ? "default" : subscriptionDetails.status === "CANCELED" ? "destructive" : "outline"}
                      className="text-sm px-3 py-1"
                    >
                      {subscriptionDetails.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-accent-foreground">
                        Monthly Total
                      </h3>
                      <span className="text-2xl font-bold text-accent-foreground">
                        £{subscriptionDetails.pricing.monthlyTotal}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-accent-foreground/70">
                      <div className="flex justify-between">
                        <span>Owner ({subscriptionDetails.pricing.owner.count})</span>
                        <span>£{subscriptionDetails.pricing.owner.subtotal}</span>
                      </div>
                      {subscriptionDetails.pricing.admins.count > 0 && (
                        <div className="flex justify-between">
                          <span>Admins ({subscriptionDetails.pricing.admins.count})</span>
                          <span>£{subscriptionDetails.pricing.admins.subtotal}</span>
                        </div>
                      )}
                      {subscriptionDetails.pricing.members.count > 0 && (
                        <div className="flex justify-between">
                          <span>Members ({subscriptionDetails.pricing.members.count})</span>
                          <span>£{subscriptionDetails.pricing.members.subtotal}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {subscriptionDetails.currentPeriodEnd && (
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {isCanceled
                          ? `Subscription will end on: ${new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()}`
                          : `Next billing date: ${new Date(subscriptionDetails.currentPeriodEnd).toLocaleDateString()}`}
                      </p>
                    </div>
                  )}
                  {isCanceled && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        Your subscription will be cancelled at the end of the current billing period.
                      </p>
                    </div>
                  )}
                  <div className="flex justify-end">
                    {isActive && !isCanceled && (
                      <Button
                        onClick={handleUnsubscribe}
                        disabled={isLoading}
                        variant="destructive"
                      >
                        Cancel Subscription
                      </Button>
                    )}
                    {isCanceled && (
                      <Button
                        disabled={true}
                        variant="outline"
                      >
                        Subscription Will Be Cancelled
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
