import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";

export const getShopifyInstallUrlService = (shop: string) => {
  return apiInvoker<{ url: string }>(END_POINT.shopify.install(shop), "GET");
};
