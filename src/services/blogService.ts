import apiInvoker from "@/lib/apiInvoker";
import axiosInstance from "@/lib/axiosInstance";
import { END_POINT } from "@/lib/url";
import type {
  BlogListResponse,
  BlogDetailResponse,
  CreateBlogPayload,
  CreateBlogResponse,
  UpdateBlogPayload,
  UpdateBlogResponse,
  DeleteBlogResponse,
  DeleteBlogImageResponse,
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

export const createBlogService = async (payload: CreateBlogPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("summary", payload.summary);
  formData.append("date", payload.date);
  formData.append("body", payload.body);
  formData.append("status", payload.status);
  formData.append("authorName", payload.authorName);

  if (payload.blogImage instanceof File) {
    formData.append("blogImage", payload.blogImage);
  }

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }

  const response = await axiosInstance({
    url: END_POINT.blog.create,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data as CreateBlogResponse;
};

export const updateBlogService = async (blogId: string, payload: UpdateBlogPayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("summary", payload.summary);
  formData.append("date", payload.date);
  formData.append("body", payload.body);
  formData.append("status", payload.status);
  formData.append("authorName", payload.authorName);

  if (payload.blogImage instanceof File) {
    formData.append("blogImage", payload.blogImage);
  }

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }

  const response = await axiosInstance({
    url: END_POINT.blog.update(blogId),
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data as UpdateBlogResponse;
};

export const deleteBlogService = (blogId: string) => {
  return apiInvoker<DeleteBlogResponse>(END_POINT.blog.delete(blogId), "DELETE");
};

export const deleteBlogImageService = async (blogId: string, imageUrl: string) => {
  const params = new URLSearchParams();
  params.append("imageUrl", imageUrl);

  const response = await axiosInstance({
    url: END_POINT.blog.deleteImage(blogId),
    method: "DELETE",
    data: params.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data as DeleteBlogImageResponse;
};
