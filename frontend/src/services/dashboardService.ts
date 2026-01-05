import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  TikTokShopResponse,
  DashboardSummaryResponse,
} from "@/types/auth";

export const getTikTokShopDataService = () => {
  return apiInvoker<TikTokShopResponse>(END_POINT.dashboard.tiktokShop, "GET");
};

export const getDashboardSummaryService = () => {
  return apiInvoker<DashboardSummaryResponse>(
    END_POINT.dashboard.summary,
    "GET"
  );
};
