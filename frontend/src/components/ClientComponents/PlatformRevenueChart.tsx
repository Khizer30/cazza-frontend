import { DollarSign, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "../ui/badge";
import { PLATFORM_COLORS } from "@/constants/PlatfromRevenueChart";
import type { DashboardSummaryData } from "@/types/auth";

interface PlatformRevenue {
  platform: string;
  platform_name: string;
  total_revenue: number;
}

interface PlatformRevenueChartProps {
  summary: DashboardSummaryData | null;
  isLoading: boolean;
}

export const PlatformRevenueChart = ({ summary, isLoading }: PlatformRevenueChartProps) => {
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

  const platformRevenue: PlatformRevenue[] = summary ? [
    { platform: "tiktok", platform_name: "TikTok Shop", total_revenue: Number(summary.revenueByPlatform.tiktok) },
    { platform: "amazon", platform_name: "Amazon", total_revenue: Number(summary.revenueByPlatform.amazon) },
    { platform: "shopify", platform_name: "Shopify", total_revenue: Number(summary.revenueByPlatform.shopify) },
    { platform: "ebay", platform_name: "eBay", total_revenue: Number(summary.revenueByPlatform.ebay) },
  ] : [];

  const totalRevenue = platformRevenue.reduce(
    (sum, platform) => sum + platform.total_revenue,
    0
  );

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


  const pieData = platformRevenue
    .filter((p) => p.total_revenue > 0)
    .map((platform) => ({
      name: platform.platform_name,
      value: platform.total_revenue,
      platform: platform.platform,
    }));

  return (
    <div className="space-y-6">
      {/* Date Range Header */}
      {/* {dateRange && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Revenue Analysis
            </CardTitle>
            <CardDescription>
              Platform revenue breakdown for the period:{" "}
              {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "N/A"}{" "}
              to {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "N/A"}
            </CardDescription>
          </CardHeader>
        </Card>
      )} */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="midday-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  £{totalRevenue.toLocaleString()}
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">
                  Connected Platforms
                </p>
                <p className="text-2xl font-bold">{summary?.connectedPlatforms.length || 0}</p>

              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>


      </div>

      {/* Revenue by Platform Section */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Platform</CardTitle>
          <CardDescription>Current month breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {pieData.length > 0 ? (
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="w-full lg:w-1/2 flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PLATFORM_COLORS[
                            entry.platform as keyof typeof PLATFORM_COLORS
                            ] || PLATFORM_COLORS.other
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number | undefined) =>
                        value !== undefined
                          ? `£${value.toLocaleString()}`
                          : "£0"
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full lg:w-1/2 space-y-3">
                {platformRevenue.map((platform) => (
                  <div
                    key={platform.platform}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            PLATFORM_COLORS[
                            platform.platform as keyof typeof PLATFORM_COLORS
                            ] || PLATFORM_COLORS.other,
                        }}
                      />
                      <span className="text-sm font-medium">
                        {platform.platform_name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold">
                      £{platform.total_revenue.toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>No revenue data available</p>
              <p className="text-sm mt-1">
                Connect your sales platforms to see revenue breakdown
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
