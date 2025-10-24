import { DollarSign, TrendingUp, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { format } from "date-fns";
import {
  MonthlyRevenueDummy,
  platformDummy,
  PLATFORM_COLORS,
} from "@/constants/PlatfromRevenueChart";
interface PlatformRevenue {
  platform: string;
  platform_name: string;
  total_revenue: number;
  transaction_count: number;
  currency: string;
  last_sync?: string;
}

interface MonthlyRevenue {
  month: string;
  total_revenue: number;
  platform_breakdown: {
    [platform: string]: number;
  };
}

export const PlatformRevenueChart = () => {
  const [platformRevenue, ] =
    useState<PlatformRevenue[]>(platformDummy);
  const [monthlyRevenue, ] =
    useState<MonthlyRevenue[]>(MonthlyRevenueDummy);
  const [loading, ] = useState(false);
  const [chartView, setChartView] = useState<"revenue" | "profit" | "expenses">(
    "revenue"
  );
  const totalRevenue = platformRevenue.reduce(
    (sum, platform) => sum + platform.total_revenue,
    0
  );
  const error = false;

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <p>Unable to load revenue data: {error}</p>
            <p className="text-sm mt-2">Showing demo data instead</p>
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

  // Calculate growth rate (comparing last two months if available)
  const growthRate =
    monthlyRevenue.length >= 2
      ? ((monthlyRevenue[monthlyRevenue.length - 1]?.total_revenue -
          monthlyRevenue[monthlyRevenue.length - 2]?.total_revenue) /
          monthlyRevenue[monthlyRevenue.length - 2]?.total_revenue) *
        100
      : 0;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {growthRate !== 0 && (
                  <p
                    className={`text-xs flex items-center gap-1 ${
                      growthRate > 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {growthRate > 0 ? "+" : ""}
                    {growthRate.toFixed(1)}% from last month
                  </p>
                )}
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
                <p className="text-2xl font-bold">{platformRevenue.length}</p>
                <p className="text-xs text-muted-foreground">
                  {platformRevenue.filter((p) => p.total_revenue > 0).length}{" "}
                  with revenue
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="midday-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Sync
                </p>
                <p className="text-sm font-medium">
                  {platformRevenue.some((p) => p.last_sync)
                    ? format(
                        new Date(
                          platformRevenue.find((p) => p.last_sync)?.last_sync ||
                            ""
                        ),
                        "MMM dd, HH:mm"
                      )
                    : "Never"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs text-success">Live Data</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Financial Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Financial Performance
            </CardTitle>
            <CardDescription>
              Monthly financial overview from all connected platforms
            </CardDescription>
            {/* Toggle Chips */}
            <div className="flex gap-2 mt-4">
              <Button
                variant={chartView === "revenue" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("revenue")}
                className="midday-button"
              >
                Revenue
              </Button>
              <Button
                variant={chartView === "profit" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("profit")}
                className="midday-button"
              >
                Profit
              </Button>
              <Button
                variant={chartView === "expenses" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartView("expenses")}
                className="midday-button"
              >
                Expenses
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#96BF47" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#96BF47" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="profitGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="expensesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#FFB3B3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFB3B3" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={(value) => `£${value.toLocaleString()}`}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `£${value.toLocaleString()}`,
                    chartView === "revenue"
                      ? "Revenue"
                      : chartView === "profit"
                      ? "Profit"
                      : "Expenses",
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px hsl(210 11% 15% / 0.1)",
                  }}
                />
                {chartView === "revenue" && (
                  <Area
                    type="monotone"
                    dataKey="total_revenue"
                    stroke="#96BF47"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    name="Revenue"
                  />
                )}
                {chartView === "profit" && (
                  <Area
                    type="monotone"
                    dataKey="total_revenue"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    fill="url(#profitGradient)"
                    name="Profit"
                  />
                )}
                {chartView === "expenses" && (
                  <Area
                    type="monotone"
                    dataKey="total_revenue"
                    stroke="#FFB3B3"
                    strokeWidth={2}
                    fill="url(#expensesGradient)"
                    name="Expenses"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Platform</CardTitle>
            <CardDescription>Current month breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
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
                      formatter={(value: number) =>
                        `£${value.toLocaleString()}`
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-2">
                  {pieData.map((platform) => (
                    <div
                      key={platform.platform}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              PLATFORM_COLORS[
                                platform.platform as keyof typeof PLATFORM_COLORS
                              ] || PLATFORM_COLORS.other,
                          }}
                        />
                        <span className="text-sm font-medium">
                          {platform.name}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        £{platform.value.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12 bg-red-700">
                <p>No revenue data available</p>
                <p className="text-sm mt-1">
                  Connect your sales platforms to see revenue breakdown
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Details */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>
            Detailed breakdown by connected platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformRevenue.map((platform) => (
              <div
                key={platform.platform}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor:
                        PLATFORM_COLORS[
                          platform.platform as keyof typeof PLATFORM_COLORS
                        ] || PLATFORM_COLORS.other,
                    }}
                  >
                    {platform.platform_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium">{platform.platform_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {platform.transaction_count} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    £{platform.total_revenue.toLocaleString()}
                  </div>
                  {platform.last_sync && (
                    <div className="text-xs text-muted-foreground">
                      Last sync:{" "}
                      {format(new Date(platform.last_sync), "MMM dd, HH:mm")}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {platformRevenue.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>No platforms connected</p>
                <p className="text-sm mt-1">
                  Go to Sales Platforms to connect your accounts
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
