// Mock expense data - this should come from your backend
export const expenseData = [
  { category: "Cost of Goods Sold", amount: 12000, percentage: 35 },
  { category: "Marketing & Advertising", amount: 4500, percentage: 13 },
  { category: "Office & Admin", amount: 2800, percentage: 8 },
  { category: "Professional Services", amount: 1500, percentage: 4 },
  { category: "Bank Fees", amount: 350, percentage: 1 },
  { category: "Software & Subscriptions", amount: 800, percentage: 2 },
  { category: "Utilities", amount: 600, percentage: 2 },
  { category: "Other", amount: 1200, percentage: 4 }
];

export const monthlyPL = [
  { month: "Jul", revenue: 28000, expenses: 18500, profit: 9500 },
  { month: "Aug", revenue: 31000, expenses: 19800, profit: 11200 },
  { month: "Sep", revenue: 29500, expenses: 18200, profit: 11300 },
  { month: "Oct", revenue: 34000, expenses: 21000, profit: 13000 },
  { month: "Nov", revenue: 36000, expenses: 22500, profit: 13500 },
  { month: "Dec", revenue: 42000, expenses: 25000, profit: 17000 }
];

// P&L Table Data - Dynamic table with monthly breakdown
export interface PLTableRow {
  parameter: string;
  isExpandable?: boolean;
  isSubRow?: boolean;
  isBold?: boolean;
  isHighlighted?: boolean;
  values: Record<string, number | string>;
}

export const plTableColumns = [
  "1-15 December 2029",
  "November",
  "October",
  "September",
  "August",
  "July",
  "June",
  "May",
  "April"
];

export const plTableData: PLTableRow[] = [
  {
    parameter: "Sales",
    isExpandable: true,
    values: {
      "1-15 December 2029": 12920.78,
      November: 26090.44,
      October: 23137.49,
      September: 10964.92,
      August: 14090.96,
      July: 15005.84,
      June: 15220.19,
      May: 16668.53,
      April: 21187.78
    }
  },
  {
    parameter: "Units",
    isExpandable: true,
    values: {
      "1-15 December 2029": 1044,
      November: 2200,
      October: 1784,
      September: 1214,
      August: 1544,
      July: 1643,
      June: 1659,
      May: 1798,
      April: 2284
    }
  },
  {
    parameter: "Refunds",
    values: {
      "1-15 December 2029": 44,
      November: 76,
      October: 17,
      September: 27,
      August: 41,
      July: 50,
      June: 37,
      May: 48,
      April: 54
    }
  },
  {
    parameter: "Promo",
    values: {
      "1-15 December 2029": -219.85,
      November: -1111.9,
      October: -487.39,
      September: 0.0,
      August: 0.0,
      July: 0.0,
      June: 0.0,
      May: 0.0,
      April: 0.0
    }
  },
  {
    parameter: "Advertising cost",
    isExpandable: true,
    values: {
      "1-15 December 2029": -19.08,
      November: -2963.83,
      October: -2916.13,
      September: -5283.15,
      August: -4468.91,
      July: -7439.72,
      June: -653.89,
      May: -2506.09,
      April: -208.52
    }
  },
  {
    parameter: "Shipping costs",
    isExpandable: true,
    values: {
      "1-15 December 2029": -1403.71,
      November: -1805.0,
      October: -2638.76,
      September: -823.07,
      August: -1128.51,
      July: -1273.49,
      June: -1205.38,
      May: -1396.81,
      April: -2043.78
    }
  },
  {
    parameter: "Giftwrap",
    values: {
      "1-15 December 2029": 0.0,
      November: 0.0,
      October: 0.0,
      September: -2.11,
      August: 0.0,
      July: -2.11,
      June: -6.33,
      May: -4.18,
      April: -4.22
    }
  },
  {
    parameter: "Refund cost",
    isExpandable: true,
    values: {
      "1-15 December 2029": 33.06,
      November: 50.02,
      October: 39.34,
      September: -186.38,
      August: -264.19,
      July: -242.57,
      June: -189.21,
      May: 97.62,
      April: -345.45
    }
  },
  {
    parameter: "Amazon fees",
    isExpandable: true,
    values: {
      "1-15 December 2029": -2642.47,
      November: -6348.13,
      October: -5331.41,
      September: -4172.17,
      August: -5296.65,
      July: -5604.06,
      June: -5738.26,
      May: -5412.6,
      April: -7578.39
    }
  },
  {
    parameter: "Cost of goods",
    isExpandable: true,
    values: {
      "1-15 December 2029": -1981.98,
      November: -4782.23,
      October: -4261.1,
      September: -4925.8,
      August: -7276.46,
      July: -6875.6,
      June: -7665.47,
      May: -7175.99,
      April: -9618.21
    }
  },
  {
    parameter: "VAT",
    values: {
      "1-15 December 2029": -1929.5,
      November: -3824.39,
      October: -3585.42,
      September: -1725.0,
      August: -2202.54,
      July: -2346.69,
      June: -2388.91,
      May: -2616.66,
      April: -3323.28
    }
  },
  {
    parameter: "Gross profit",
    isBold: true,
    isHighlighted: true,
    values: {
      "1-15 December 2029": 4201.91,
      November: 4444.63,
      October: 3793.28,
      September: -6152.73,
      August: -6546.28,
      July: -8778.37,
      June: -2627.27,
      May: -2723.92,
      April: -1934.03
    }
  },
  {
    parameter: "Indirect expenses",
    isExpandable: true,
    values: {
      "1-15 December 2029": -280.5,
      November: -323.78,
      October: -299.22,
      September: -298.78,
      August: -324.0,
      July: -299.22,
      June: -323.78,
      May: -299.22,
      April: -298.78
    }
  },
  {
    parameter: "Net profit",
    isBold: true,
    isHighlighted: true,
    values: {
      "1-15 December 2029": 3921.41,
      November: 4120.85,
      October: 3494.06,
      September: -6451.51,
      August: -6870.28,
      July: -9077.59,
      June: -2951.05,
      May: -3023.14,
      April: -2232.81
    }
  },
  {
    parameter: "Estimated payout",
    values: {
      "1-15 December 2029": 9018.8,
      November: 16932.19,
      October: 16365.24,
      September: 6018.12,
      August: 7362.24,
      July: 8162.76,
      June: 8671.87,
      May: 10237.91,
      April: 12614.7
    }
  },
  {
    parameter: "Real ACOS",
    values: {
      "1-15 December 2029": "0.15%",
      November: "11.36%",
      October: "12.60%",
      September: "48.18%",
      August: "31.71%",
      July: "49.58%",
      June: "4.30%",
      May: "15.03%",
      April: "0.98%"
    }
  },
  {
    parameter: "% Refunds",
    values: {
      "1-15 December 2029": "4.21%",
      November: "3.45%",
      October: "0.95%",
      September: "2.22%",
      August: "2.66%",
      July: "3.04%",
      June: "2.23%",
      May: "2.67%",
      April: "2.36%"
    }
  },
  {
    parameter: "Sellable returns",
    values: {
      "1-15 December 2029": "63.64%",
      November: "53.85%",
      October: "49.25%",
      September: "100.00%",
      August: "94.12%",
      July: "82.61%",
      June: "71.43%",
      May: "88.57%",
      April: "89.13%"
    }
  },
  {
    parameter: "Margin",
    isBold: true,
    values: {
      "1-15 December 2029": "30.35%",
      November: "15.79%",
      October: "15.10%",
      September: "-58.84%",
      August: "-48.76%",
      July: "-60.49%",
      June: "-19.39%",
      May: "-18.14%",
      April: "-10.54%"
    }
  }
];
