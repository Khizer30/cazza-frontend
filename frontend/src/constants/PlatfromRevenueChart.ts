export const PLATFORM_COLORS = {
  shopify: "#96BF47",
  amazon: "#FF9900",
  ebay: "#E53238",
  etsy: "#F16521",
  tiktok: "#FE2C55",
  facebook: "#1877F2",
  woocommerce: "#96588A",
  magento: "#EE672F",
  other: "#8B5CF6",
};
export const platformDummy = [
  {
    platform: "shopify",
    platform_name: "Shopify",
    total_revenue: 28750.5,
    transaction_count: 234,
    currency: "GBP",
    last_sync: "2025-10-20T23:30:00Z",
  },
  {
    platform: "amazon",
    platform_name: "Amazon",
    total_revenue: 19340.25,
    transaction_count: 156,
    currency: "GBP",
    last_sync: "2025-10-20T23:30:00Z",
  },
  {
    platform: "ebay",
    platform_name: "eBay",
    total_revenue: 12680.75,
    transaction_count: 89,
    currency: "GBP",
    last_sync: "2025-10-20T23:30:00Z",
  },
  {
    platform: "tiktok_shop",
    platform_name: "TikTok Shop",
    total_revenue: 8750.0,
    transaction_count: 67,
    currency: "GBP",
    last_sync: "2025-10-20T23:30:00Z",
  },
];
export const MonthlyRevenueDummy = [
  {
    month: "2025-08",
    total_revenue: 56000.75,
    platform_breakdown: {
      shopify: 22000.5,
      amazon: 16000.25,
      ebay: 10000.0,
      tiktok_shop: 8000.0,
    },
  },
  {
    month: "2025-09",
    total_revenue: 59500.0,
    platform_breakdown: {
      shopify: 23000.75,
      amazon: 17000.25,
      ebay: 10500.0,
      tiktok_shop: 8250.0,
    },
  },
  {
    month: "2025-10",
    total_revenue: 69521.5,
    platform_breakdown: {
      shopify: 28750.5,
      amazon: 19340.25,
      ebay: 12680.75,
      tiktok_shop: 8750.0,
    },
  },
];
