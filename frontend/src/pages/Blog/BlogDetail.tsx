import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { getBlogDetailService } from "@/services/blogService";
import type { BlogDetail as BlogDetailType } from "@/types/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


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

          <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.body}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </ScrollArea>
  );
};
