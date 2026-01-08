import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useCallback } from "react";
import { getBlogDetailService } from "@/services/blogService";
import type { BlogDetail as BlogDetailType } from "@/types/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";


const getAuthorInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

export const BlogDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(false);
        const response = await getBlogDetailService(slug);
        if (response.success && response.data) {
          setBlog(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching blog detail:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAllImages = () => {
    if (!blog) return [];
    if (blog.images && blog.images.length > 0) {
      return blog.images;
    }
    return [];
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
  }, []);

  const navigateImage = useCallback((direction: "prev" | "next") => {
    const allImages = getAllImages();
    if (selectedImageIndex === null || allImages.length === 0) return;

    if (direction === "prev") {
      const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1;
      setSelectedImageIndex(newIndex);
    } else {
      const newIndex = selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0;
      setSelectedImageIndex(newIndex);
    }
  }, [selectedImageIndex, blog]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, navigateImage, closeLightbox]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 -ml-4"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(blog.date)}</time>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>

            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">Posted by</span>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback
                    className={`text-sm text-white ${getAvatarColor(blog.authorName)}`}
                  >
                    {getAuthorInitials(blog.authorName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {blog.authorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {blog.user.firstName} {blog.user.lastName}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="border-t border-border pt-8" />

          {blog.blogImage && (
            <div className="w-full">
              <img
                src={blog.blogImage}
                alt={blog.title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.body}
            </ReactMarkdown>
          </div>

          {blog.images && blog.images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blog.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={imageUrl}
                      alt={`${blog.title} - Image ${index + 1}`}
                      className="w-full h-full rounded-lg object-cover border border-border group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none" showCloseButton={false}>
              {selectedImageIndex !== null && getAllImages()[selectedImageIndex] && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                    onClick={closeLightbox}
                  >
                    <X className="w-6 h-6" />
                  </Button>

                  {getAllImages().length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 z-50 text-white hover:bg-white/20"
                        onClick={() => navigateImage("prev")}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 z-50 text-white hover:bg-white/20"
                        onClick={() => navigateImage("next")}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </Button>
                    </>
                  )}

                  <img
                    src={getAllImages()[selectedImageIndex]}
                    alt={`${blog.title} - Image ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />

                  {getAllImages().length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                      {selectedImageIndex + 1} / {getAllImages().length}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </article>
      </div>
    </ScrollArea>
  );
};
