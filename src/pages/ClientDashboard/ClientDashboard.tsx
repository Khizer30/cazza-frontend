import { DateRangePicker } from "@/components/ClientComponents/DateRangePicker";
import { PlatformRevenueChart } from "@/components/ClientComponents/PlatformRevenueChart";
import { ProfitLossStatement } from "@/components/ClientComponents/ProfitLossStatement";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDashboardSummaryService,
  getDashboardDetailService,
} from "@/services/dashboardService";
import type { DashboardSummaryData, DashboardDetailItem } from "@/types/auth";
import {
  BarChart3,
  Calendar,
  DollarSign,
  PieChart,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DateRange } from "react-day-picker";

export const ClientDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [marketplace, setMarketplace] = useState<string>("all");
  const [summary, setSummary] = useState<DashboardSummaryData | null>(null);
  const [detailData, setDetailData] = useState<DashboardDetailItem[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDateForAPI = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Calculate default date range (last 6 months)
      const defaultToDate = new Date();
      const defaultFromDate = new Date();
      defaultFromDate.setMonth(defaultFromDate.getMonth() - 6);

      // Use selected dates or defaults
      const fromDate = formatDateForAPI(dateRange?.from || defaultFromDate);
      const toDate = formatDateForAPI(dateRange?.to || defaultToDate);

      // Fetch summary and detail data in parallel
      const [summaryRes, detailRes] = await Promise.all([
        getDashboardSummaryService(fromDate, toDate, marketplace),
        getDashboardDetailService(fromDate, toDate, marketplace),
      ]);

      if (summaryRes.success && summaryRes.data) {
        setSummary(summaryRes.data);
      }

      if (detailRes.success && detailRes.data) {
        setDetailData(detailRes.data);
        // Transform detail data for the chart
        const transformed = detailRes.data
          .map((item: DashboardDetailItem) => {
            const [monthStr] = item.monthYear.split(" ");
            const revenue = parseFloat(item["Gross Revenue"]);
            const netSales = parseFloat(item["Net Sales"] || "0");
            const expenses = revenue - netSales;
            return {
              month: monthStr.slice(0, 3),
              revenue: revenue,
              expenses: expenses,
            };
          })
          .reverse(); // Show oldest to newest
        setChartData(transformed);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize default date range on mount
  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    setDateRange({ from: sixMonthsAgo, to: today });
  }, []);

  // Fetch data when date range or marketplace changes
  useEffect(() => {
    if (dateRange) {
      fetchData();
    }
  }, [dateRange, marketplace]);

  const handleReset = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    setDateRange({ from: sixMonthsAgo, to: today });
  };

  return (
    <div className="flex-1 space-y-3 p-4">
      <title>Cazza</title>
      <meta
        name="description"
        content="View your real-time financial insights and platform performance on the Cazza dashboard."
      />
      {/* Date Range Selector */}
      <Card className="hover:shadow-none hover:transform-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date Range Selection
          </CardTitle>
          <CardDescription>
            Select a date range to filter your financial insights and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              placeholder="Select date range for insights"
            />
            <Select value={marketplace} onValueChange={setMarketplace}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select marketplace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Marketplaces</SelectItem>
                {summary?.connectedPlatforms?.map((platform) => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset to Last 6 Months
            </Button>
          </div>
          {dateRange && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Selected Period:</strong>{" "}
                {dateRange.from?.toLocaleDateString()} to{" "}
                {dateRange.to?.toLocaleDateString()}
                {" • "}
                <strong>Marketplace:</strong>{" "}
                {marketplace === "all" ? "All Marketplaces" : marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-1">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="profit-loss" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            P&L
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3">
          {/* Financial KPI Summary - Midday Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 midday-fade-in">
            <Card>
              <CardContent className="px-6 py-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </span>
                    <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-success" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {loading ? (
                      <div className="h-9 w-24 bg-muted animate-pulse rounded" />
                    ) : (
                      `£${Math.round(parseFloat(summary?.totalRevenue || "0")).toLocaleString("en-GB", {
                        maximumFractionDigits: 0,
                      })}`
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-6 py-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Net Profit
                    </span>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {loading ? (
                      <div className="h-9 w-24 bg-muted animate-pulse rounded" />
                    ) : (
                      `£${Math.round(parseFloat(summary?.netProfit || "0")).toLocaleString("en-GB", {
                        maximumFractionDigits: 0,
                      })}`
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {summary?.profitMargin ? Math.round(parseFloat(summary.profitMargin)) : "0"}% margin
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-6 py-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Expenses
                    </span>
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-destructive" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {loading ? (
                      <div className="h-9 w-24 bg-muted animate-pulse rounded" />
                    ) : (
                      `£${Math.round(parseFloat(summary?.totalExpense || "0")).toLocaleString("en-GB", {
                        maximumFractionDigits: 0,
                      })}`
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {summary &&
                        summary.totalRevenue &&
                        Number(summary.totalRevenue) > 0
                        ? Math.round(
                          (Number(summary.totalExpense) /
                            Number(summary.totalRevenue)) *
                          100
                        )
                        : "0"}
                      % of revenue
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart - Midday Style */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses Overview</CardTitle>
              <CardDescription>Monthly financial performance</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[400px] w-full bg-muted animate-pulse rounded-lg" />
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#96BF47"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#96BF47"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      <linearGradient
                        id="expensesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FFB3B3"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FFB3B3"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis
                      tickFormatter={(value) => `£${Math.round(value).toLocaleString("en-GB", {
                        maximumFractionDigits: 0,
                      })}`}
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <Tooltip
                      formatter={(
                        value: number | undefined,
                        name: string | undefined
                      ) => [
                          value !== undefined
                            ? `£${Math.round(value).toLocaleString("en-GB", {
                                maximumFractionDigits: 0,
                              })}`
                            : "£0",
                          name || "",
                        ]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px hsl(210 11% 15% / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#96BF47"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#FFB3B3"
                      strokeWidth={2}
                      fill="url(#expensesGradient)"
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  No chart data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <PlatformRevenueChart summary={summary} isLoading={loading} />
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-6">
          <ProfitLossStatement
            summary={summary}
            detailData={detailData}
            isLoadingProp={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
