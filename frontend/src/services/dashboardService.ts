import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type { TikTokShopResponse } from "@/types/auth";

export const getTikTokShopDataService = () => {
  return apiInvoker<TikTokShopResponse>(
    END_POINT.dashboard.tiktokShop,
    "GET"
  );
};

