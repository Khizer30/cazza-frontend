import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  BlogListResponse,
  BlogDetailResponse,
  CreateBlogPayload,
  CreateBlogResponse,
  UpdateBlogPayload,
  UpdateBlogResponse,
  DeleteBlogResponse,
} from "@/types/auth";

export const getBlogsService = (status?: "PUBLISHED" | "DRAFT") => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);

  const url = status
    ? `${END_POINT.blog.list}?${params.toString()}`
    : END_POINT.blog.list;

  return apiInvoker<BlogListResponse>(url, "GET");
};

export const getBlogDetailService = (blogId: string) => {
  return apiInvoker<BlogDetailResponse>(END_POINT.blog.detail(blogId), "GET");
};

export const createBlogService = (payload: CreateBlogPayload) => {
  return apiInvoker<CreateBlogResponse>(END_POINT.blog.create, "POST", payload);
};

export const updateBlogService = (blogId: string, payload: UpdateBlogPayload) => {
  return apiInvoker<UpdateBlogResponse>(END_POINT.blog.update(blogId), "PUT", payload);
};

export const deleteBlogService = (blogId: string) => {
  return apiInvoker<DeleteBlogResponse>(END_POINT.blog.delete(blogId), "DELETE");
};
