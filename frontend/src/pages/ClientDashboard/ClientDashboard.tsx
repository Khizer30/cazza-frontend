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
import { tempRevenueData, totalRevenue } from "@/constants/ClientDashboard";
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

  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    setDateRange({ from: sixMonthsAgo, to: today });
  }, []);

  const handleReset = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    setDateRange({ from: sixMonthsAgo, to: today });
  };

  return (
    <div className="flex-1 space-y-3 p-4">
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
                    £{totalRevenue.toLocaleString()}
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
                    £{(totalRevenue * 3).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      37% margin
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
                      Monthly Expenses
                    </span>
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-destructive" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    £{(totalRevenue * 3).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      63% of revenue
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
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={tempRevenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#96BF47" stopOpacity={0.3} />
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
                      <stop offset="5%" stopColor="#FFB3B3" stopOpacity={0.3} />
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
                    tickFormatter={(value) => `£${value.toLocaleString()}`}
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={(
                      value: number | undefined,
                      name: string | undefined
                    ) => [
                      value !== undefined ? `£${value.toLocaleString()}` : "£0",
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <PlatformRevenueChart />
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-6">
          <ProfitLossStatement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
