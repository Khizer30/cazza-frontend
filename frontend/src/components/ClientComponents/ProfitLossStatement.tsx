import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CalendarIcon,
  ChevronRight,
  ChevronDown,
  Download,
  FileText,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
monthlyPL,
type PLTableRow,
} from "@/constants/ProfitLssStatement";
import { getTikTokShopDataService } from "@/services/dashboardService";
import type { TikTokShopDataItem } from "@/types/auth";
import { AxiosError } from "axios";

// Helper function to format currency values
const formatValue = (value: number | string): string => {
  if (typeof value === "string") return value;
  if (value === 0) return "£ 0.00";
  const prefix = value < 0 ? "-£ " : "£ ";
  return `${prefix}${Math.abs(value).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper function to determine value color
const getValueColor = (value: number | string, parameter: string): string => {
  if (typeof value === "string") {
    if (value.startsWith("-")) return "text-red-500";
    return "";
  }
  if (value < 0) return "text-red-500";
  if (
    value > 0 &&
    (parameter === "Gross profit" ||
      parameter === "Net profit" ||
      parameter === "Net Profit (£)")
  )
    return "text-green-500";
  return "";
};

// Transform TikTok Shop API data to table structure
const transformTikTokShopData = (
  data: TikTokShopDataItem[]
): { columns: string[]; rows: PLTableRow[]; } => {
  if (!data || data.length === 0) {
    return { columns: [], rows: [] };
  }

  // Extract unique monthYear values as columns (in reverse order to show most recent first)
  const columns = [...new Set(data.map((item) => item.monthYear))].reverse();

  // Define the metrics to display (excluding monthYear)
  const metrics = [
    "Orders",
    "Units Sold",
    "Gross Revenue (£)",
    "Commission Fee (£)",
    "Payment Fee (£)",
    "Service Fee (£)",
    "Ad Spend (£)",
    "Refunds (£)",
    "Shipping Deduction (£)",
    "Other Deductions (£)",
    "Payout (£)",
    "Net Profit (£)",
  ];

  // Create rows for each metric
  const rows: PLTableRow[] = metrics.map((metric) => {
    const values: Record<string, number> = {};
    columns.forEach((monthYear) => {
      const item = data.find((d) => d.monthYear === monthYear);
      if (item) {
        values[monthYear] = item[metric as keyof TikTokShopDataItem] as number;
      }
    });

    return {
      parameter: metric,
      values,
      isBold: metric === "Net Profit (£)",
      isHighlighted: metric === "Net Profit (£)",
    };
  });

  return { columns, rows };
};

export const ProfitLossStatement = () => {
  // API data states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tiktokShopData, setTiktokShopData] = useState<TikTokShopDataItem[]>(
    []
  );
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [tableRows, setTableRows] = useState<PLTableRow[]>([]);

  // Filter states
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [marketplace, setMarketplace] = useState<string>("all");
  const [sku, setSku] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");
  const [currency, setCurrency] = useState<string>("GBP");

  // State for expandable rows
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Fetch TikTok Shop data on component mount
  useEffect(() => {
    const fetchTikTokShopData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTikTokShopDataService();
        if (response && response.success && response.data) {
          setTiktokShopData(response.data);
          const transformed = transformTikTokShopData(response.data);
          setTableColumns(transformed.columns);
          setTableRows(transformed.rows);
        } else {
          setError(response.message || "Failed to fetch TikTok Shop data");
        }
      } catch (err) {
        console.error("Error fetching TikTok Shop data:", err);
        if (err instanceof AxiosError) {
          setError(
            err.response?.data?.message ||
            "Failed to fetch TikTok Shop data. Please try again."
          );
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTikTokShopData();
  }, []);

  const toggleRow = (parameter: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(parameter)) {
        newSet.delete(parameter);
      } else {
        newSet.add(parameter);
      }
      return newSet;
    });
  };

  // Calculate summary metrics from TikTok Shop data
  const latestData = tiktokShopData.length > 0 ? tiktokShopData[tiktokShopData.length - 1] : null;

  const totalRevenue = latestData?.["Gross Revenue (£)"] || 0;
  const totalExpenses =
    (latestData?.["Commission Fee (£)"] || 0) +
    (latestData?.["Payment Fee (£)"] || 0) +
    (latestData?.["Service Fee (£)"] || 0) +
    (latestData?.["Ad Spend (£)"] || 0) +
    (latestData?.["Refunds (£)"] || 0) +
    (latestData?.["Shipping Deduction (£)"] || 0) +
    (latestData?.["Other Deductions (£)"] || 0);
  const grossProfit = latestData?.["Net Profit (£)"] || 0;
  const profitMargin =
    totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  // Export handlers
  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
    // TODO: Implement CSV export API call
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // TODO: Implement PDF export API call
  };

  const handleXeroSync = () => {
    console.log("Syncing to Xero...");
    // TODO: Implement Xero sync API call
  };

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

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading P&L Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (tableRows.length === 0 || tableColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>P&L Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-muted-foreground">
            No data available. Please check your TikTok Shop connection.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Title */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarIcon className="h-5 w-5" />
                Profit & Loss Statement
              </CardTitle>
              <CardDescription>
                Granular, accounting-grade reports with full traceability
              </CardDescription>
            </div>
            {/* Export & Sync Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleXeroSync}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Xero Sync
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {/* Date Range Picker */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">Date Range</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) =>
                      setDateRange({ from: range?.from, to: range?.to })
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Marketplace Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">Marketplace</span>
              <Select value={marketplace} onValueChange={setMarketplace}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select marketplace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Marketplaces</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="ebay">eBay</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="tiktok">TikTok Shop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SKU Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">SKU</span>
              <Select value={sku} onValueChange={setSku}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select SKU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All SKUs</SelectItem>
                  <SelectItem value="SKU001">SKU001</SelectItem>
                  <SelectItem value="SKU002">SKU002</SelectItem>
                  <SelectItem value="SKU003">SKU003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">Country</span>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Currency Filter */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">Currency</span>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  £{Math.round(totalRevenue).toLocaleString()}
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
                  £{Math.round(totalExpenses).toLocaleString()}
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
                  className={`text-2xl font-bold ${grossProfit >= 0 ? "text-success" : "text-destructive"
                    }`}
                >
                  £{Math.round(grossProfit).toLocaleString()}
                </p>
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
                  className={`text-2xl font-bold ${profitMargin >= 20
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

      {/* Dynamic P&L Table */}
      <Card>
        <CardHeader>
          <CardTitle>P&L Statement Details</CardTitle>
          <CardDescription>
            Revenue, COGS, Fees (commission, shipping, ads) breakdown by period
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground sticky left-0 bg-muted/50 min-w-[180px]">
                    Parameter/Date
                  </th>
                  {tableColumns.map((column) => (
                    <th
                      key={column}
                      className="text-right p-3 font-medium text-muted-foreground min-w-[120px]"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.parameter}
                    className={`border-b hover:bg-muted/30 transition-colors ${row.isHighlighted ? "bg-muted/20" : ""
                      } ${row.isSubRow ? "bg-muted/10" : ""}`}
                  >
                    <td
                      className={`p-3 sticky left-0 bg-background ${row.isBold ? "font-semibold" : ""
                        } ${row.isSubRow ? "pl-8" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        {row.isExpandable && (
                          <button
                            onClick={() => toggleRow(row.parameter)}
                            className="p-0.5 hover:bg-muted rounded"
                          >
                            {expandedRows.has(row.parameter) ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                        )}
                        <span>{row.parameter}</span>
                      </div>
                    </td>
                    {tableColumns.map((column) => {
                      const value = row.values[column];
                      return (
                        <td
                          key={column}
                          className={`p-3 text-right ${row.isBold ? "font-semibold" : ""
                            } ${getValueColor(value, row.parameter)}`}
                        >
                          {typeof value === "number"
                            ? formatValue(value)
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
                    name ? name.charAt(0).toUpperCase() + name.slice(1) : "",
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
    </div>
  );
};
