import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  DashboardSummaryResponse,
  DashboardDetailResponse,
} from "@/types/auth";

export const getDashboardSummaryService = (
  fromDate?: string,
  toDate?: string
) => {
  const params = new URLSearchParams();
  if (fromDate) params.append("fromDate", fromDate);
  if (toDate) params.append("toDate", toDate);

  const url = params.toString()
    ? `${END_POINT.dashboard.summary}?${params.toString()}`
    : END_POINT.dashboard.summary;

  return apiInvoker<DashboardSummaryResponse>(url, "GET");
};

export const getDashboardDetailService = (
  fromDate?: string,
  toDate?: string,
  marketplace: string = "all"
) => {
  const params = new URLSearchParams();
  if (fromDate) params.append("fromDate", fromDate);
  if (toDate) params.append("toDate", toDate);
  params.append("marketplace", marketplace);

  const url = `${END_POINT.dashboard.detail}?${params.toString()}`;

  return apiInvoker<DashboardDetailResponse>(url, "GET");
};
