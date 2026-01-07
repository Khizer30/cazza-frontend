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
} from "lucide-react";
import { type PLTableRow } from "@/constants/ProfitLssStatement";
import type { DashboardDetailItem, DashboardSummaryData } from "@/types/auth";
import type { DateRange } from "react-day-picker";

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

// Transform Dashboard Detail API data to table structure
const transformDetailData = (
  data: DashboardDetailItem[]
): { columns: string[]; rows: PLTableRow[] } => {
  if (!data || data.length === 0) {
    return { columns: [], rows: [] };
  }

  // Extract unique monthYear values as columns (in reverse order to show most recent first)
  const columns = [...new Set(data.map((item) => item.monthYear))].reverse();

  // Define the metrics to display (excluding monthYear)
  const metrics = [
    "Orders",
    "Units Sold",
    "Gross Revenue",
    "Commission Fee",
    "Payment Fee",
    "Service Fee",
    "Ad Spend",
    "Refunds",
    "Shipping Deduction",
    "Other Deductions",
    "Payout",
    "Net Profit",
  ];

  // Create rows for each metric
  const rows: PLTableRow[] = metrics.map((metric) => {
    const values: Record<string, number> = {};
    columns.forEach((monthYear) => {
      const item = data.find((d) => d.monthYear === monthYear);
      if (item) {
        values[monthYear] =
          parseFloat(item[metric as keyof DashboardDetailItem] as string) || 0;
      }
    });

    return {
      parameter: `${metric} (£)`,
      values,
      isBold: metric === "Net Profit",
      isHighlighted: metric === "Net Profit",
    };
  });

  return { columns, rows };
};

export const ProfitLossStatement = ({
  summary: externalSummary,
  detailData,
  isLoadingProp,
}: {
  summary?: DashboardSummaryData | null;
  detailData?: DashboardDetailItem[];
  isLoadingProp?: boolean;
  dateRange?: DateRange;
  marketplace?: string;
}) => {
  // Use props directly - parent manages the state
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [tableRows, setTableRows] = useState<PLTableRow[]>([]);

  // Filter states (for future use - kept non-functional as per plan)
  const [sku, setSku] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");
  const [currency, setCurrency] = useState<string>("GBP");

  // State for expandable rows
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Transform data when detailData changes
  useEffect(() => {
    if (detailData && detailData.length > 0) {
      const transformed = transformDetailData(detailData);
      setTableColumns(transformed.columns);
      setTableRows(transformed.rows);
    } else {
      setTableColumns([]);
      setTableRows([]);
    }
  }, [detailData]);

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

  // Use Summary API data for main cards
  const totalRevenue = Number(externalSummary?.totalRevenue || 0);
  const totalExpenses = Number(externalSummary?.totalExpense || 0);
  const grossProfit = Number(externalSummary?.netProfit || 0);
  const profitMargin = Number(externalSummary?.profitMargin || 0);

  // Export handlers
  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
    // TODO: Implement CSV export API call
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // TODO: Implement PDF export API call
  };



  if (isLoadingProp) {
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

  if (tableRows.length === 0 || tableColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>P&L Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-muted-foreground">
            No data available for the selected filters. Try adjusting the date range or marketplace.
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
        <CardHeader>
          <CardTitle className="text-base">Additional Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
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
                  {formatValue(totalRevenue)}
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
                  {formatValue(totalExpenses)}
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
                  {formatValue(grossProfit)}
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
                  {profitMargin.toFixed(2)}%
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
    </div>
  );
};
