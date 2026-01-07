import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type { BlogListResponse, BlogDetailResponse } from "@/types/auth";

export const getBlogsService = () => {
  return apiInvoker<BlogListResponse>(END_POINT.blog.list, "GET");
};

export const getBlogDetailService = (blogId: string) => {
  return apiInvoker<BlogDetailResponse>(END_POINT.blog.detail(blogId), "GET");
};
