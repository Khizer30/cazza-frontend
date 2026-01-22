import { faShopify, faAmazon, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DollarSign, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import type { DashboardSummaryData } from "@/types/auth";

interface PlatformRevenue {
  platform: string;
  platform_name: string;
  total_revenue: number;
}

interface PlatformRevenueChartProps {
  summary: DashboardSummaryData | null;
  isLoading: boolean;
  selectedMarketplace?: string;
}

export const PlatformRevenueChart = ({ summary, isLoading, selectedMarketplace }: PlatformRevenueChartProps) => {
  const error = false;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Platform Data...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSelectedPlatformRevenue = (): PlatformRevenue | null => {
    if (!summary || !selectedMarketplace) return null;

    const marketplaceMap: {
      [key: string]: { platform: string; platform_name: string; revenueKey: keyof typeof summary.revenueByPlatform };
    } = {
      shopify: {
        platform: "shopify",
        platform_name: "Shopify",
        revenueKey: "shopify"
      },
      amazon: {
        platform: "amazon",
        platform_name: "Amazon",
        revenueKey: "amazon"
      },
      tiktok: {
        platform: "tiktok",
        platform_name: "TikTok Shop",
        revenueKey: "tiktok"
      }
    };

    const platformKey = selectedMarketplace.toLowerCase();
    const config = marketplaceMap[platformKey];

    if (!config) return null;

    return {
      platform: config.platform,
      platform_name: config.platform_name,
      total_revenue: Number(summary.revenueByPlatform[config.revenueKey])
    };
  };

  const selectedPlatform = getSelectedPlatformRevenue();
  const totalRevenue = selectedPlatform?.total_revenue || 0;

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <p>Unable to load revenue data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!selectedMarketplace) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select a Marketplace</h3>
          <p className="text-sm text-muted-foreground text-center">
            Please select a marketplace from the dropdown above to view revenue data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="midday-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">£{Math.round(totalRevenue).toLocaleString("en-GB")}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="midday-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform</p>
                <p className="text-2xl font-bold">{selectedPlatform?.platform_name || "N/A"}</p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedPlatform && selectedPlatform.total_revenue > 0 ? (
            <div className="flex items-center justify-between p-6 rounded-lg border bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {selectedPlatform.platform === "shopify" && (
                    <FontAwesomeIcon icon={faShopify} className="h-6 w-6" style={{ color: "#96bf48" }} />
                  )}
                  {selectedPlatform.platform === "amazon" && (
                    <FontAwesomeIcon icon={faAmazon} className="h-6 w-6" style={{ color: "#FF9900" }} />
                  )}
                  {selectedPlatform.platform === "tiktok" && (
                    <FontAwesomeIcon icon={faTiktok} className="h-6 w-6" style={{ color: "#FFFFFF" }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{selectedPlatform.platform_name}</p>
                  <p className="text-3xl font-bold mt-1">
                    £{Math.round(selectedPlatform.total_revenue).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>No revenue data available</p>
              <p className="text-sm mt-1">Revenue data will appear here once available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
