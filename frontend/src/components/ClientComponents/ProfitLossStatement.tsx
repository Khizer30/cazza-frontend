import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

import { format } from "date-fns";

// Mock expense data - this should come from your backend
const expenseData = [
  { category: "Cost of Goods Sold", amount: 12000, percentage: 35 },
  { category: "Marketing & Advertising", amount: 4500, percentage: 13 },
  { category: "Office & Admin", amount: 2800, percentage: 8 },
  { category: "Professional Services", amount: 1500, percentage: 4 },
  { category: "Bank Fees", amount: 350, percentage: 1 },
  { category: "Software & Subscriptions", amount: 800, percentage: 2 },
  { category: "Utilities", amount: 600, percentage: 2 },
  { category: "Other", amount: 1200, percentage: 4 },
];

const monthlyPL = [
  { month: "Jul", revenue: 28000, expenses: 18500, profit: 9500 },
  { month: "Aug", revenue: 31000, expenses: 19800, profit: 11200 },
  { month: "Sep", revenue: 29500, expenses: 18200, profit: 11300 },
  { month: "Oct", revenue: 34000, expenses: 21000, profit: 13000 },
  { month: "Nov", revenue: 36000, expenses: 22500, profit: 13500 },
  { month: "Dec", revenue: 42000, expenses: 25000, profit: 17000 },
];

export const ProfitLossStatement = () => {
  // TODO: Replace with actual data fetching logic or hook
  const totalRevenue = 42000; // Mock value for demonstration
  const loading = false; // Mock loading state
  const dateRange:any =12-2-2025;

  const totalExpenses = expenseData.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const grossProfit = totalRevenue - totalExpenses;
  const profitMargin =
    totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  // Calculate month-over-month growth
  const lastMonth = monthlyPL[monthlyPL.length - 1];
  const previousMonth = monthlyPL[monthlyPL.length - 2];
  const profitGrowth = previousMonth
    ? ((lastMonth.profit - previousMonth.profit) / previousMonth.profit) * 100
    : 0;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading P&L Statement...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Header */}
      {dateRange && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Profit & Loss Statement
            </CardTitle>
            <CardDescription>
              Financial performance for the period:{" "}
              {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "N/A"}{" "}
              to {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "N/A"}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* P&L Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="px-3 py-2">
          <CardContent className="p-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-success">
                  £{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="px-3 py-2">
          <CardContent className="p-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600">
                  £{totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="px-3 py-2">
          <CardContent className="p-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Net Profit
                </p>
                <p
                  className={`text-2xl font-bold ${
                    grossProfit >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  £{grossProfit.toLocaleString()}
                </p>
                {profitGrowth !== 0 && (
                  <p
                    className={`text-xs flex items-center gap-1 ${
                      profitGrowth > 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {profitGrowth > 0 ? "+" : ""}
                    {profitGrowth.toFixed(1)}% vs last month
                  </p>
                )}
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="px-3 py-2">
          <CardContent className="p-4 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Profit Margin
                </p>
                <p
                  className={`text-2xl font-bold ${
                    profitMargin >= 20
                      ? "text-success"
                      : profitMargin >= 10
                      ? "text-warning"
                      : "text-destructive"
                  }`}
                >
                  {profitMargin.toFixed(1)}%
                </p>
                <Badge
                  variant={
                    profitMargin >= 20
                      ? "default"
                      : profitMargin >= 10
                      ? "secondary"
                      : "destructive"
                  }
                  className="text-xs"
                >
                  {profitMargin >= 20
                    ? "Excellent"
                    : profitMargin >= 10
                    ? "Good"
                    : "Needs Attention"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* P&L Chart */}
      <Card className="midday-card">
        <CardHeader>
          <CardTitle>Profit & Loss Trend</CardTitle>
          <CardDescription>
            Monthly revenue, expenses, and profit over time with smooth
            gradients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyPL}>
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
                  id="expensesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#FFB3B3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFB3B3" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.05} />
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
                formatter={(value: number, name: string) => [
                  `£${value.toLocaleString()}`,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
                labelFormatter={(label) => `Month: ${label}`}
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
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#4A90E2"
                strokeWidth={2}
                fill="url(#profitGradient)"
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Current month expense categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseData.map((expense, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{expense.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {expense.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${expense.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="font-bold">
                    £{expense.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
