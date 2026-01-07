import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Image, Loader2, CalendarIcon, Eye, Edit3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import { createBlogService, getBlogDetailService, updateBlogService } from "@/services/blogService";
import { useToast } from "@/components/ToastProvider";
import { BlogFormatToolbar } from "@/components/ClientComponents/BlogFormatToolbar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogFormData {
  title: string;
  summary: string;
  date: Date | undefined;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  authorName: string;
  image: string;
}

export const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    summary: "",
    date: undefined,
    body: "",
    status: "DRAFT",
    authorName: "",
    image: "",
  });
  const [fetchingBlog, setFetchingBlog] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (id) {
      const fetchBlogData = async () => {
        try {
          setFetchingBlog(true);
          const response = await getBlogDetailService(id);
          if (response.success && response.data) {
            const blog = response.data;
            setFormData({
              title: blog.title,
              summary: blog.summary,
              date: new Date(blog.date),
              body: blog.body,
              status: blog.status,
              authorName: blog.authorName,
              image: "",
            });
          } else {
            showToast("Failed to load blog data", "error");
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
          showToast("Failed to load blog data", "error");
        } finally {
          setFetchingBlog(false);
        }
      };

      fetchBlogData();
    }
  }, [id]);

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormatClick = (format: string) => {
    const inputElement = bodyTextareaRef.current;
    if (!inputElement) return;

    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    const currentText = formData.body;

    let formattedText = "";
    let cursorOffset = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        cursorOffset = selectedText ? 0 : -2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        cursorOffset = selectedText ? 0 : -2;
        break;
      case "strikethrough":
        formattedText = `~~${selectedText}~~`;
        cursorOffset = selectedText ? 0 : -2;
        break;
      case "link":
        formattedText = `[${selectedText || "text"}](url)`;
        cursorOffset = selectedText ? -4 : -9;
        break;
      case "bulletList":
        formattedText = `- ${selectedText}`;
        cursorOffset = 0;
        break;
      case "heading1":
        formattedText = `# ${selectedText}`;
        cursorOffset = 0;
        break;
      case "heading2":
        formattedText = `## ${selectedText}`;
        cursorOffset = 0;
        break;
      case "heading3":
        formattedText = `### ${selectedText}`;
        cursorOffset = 0;
        break;
      case "code":
        formattedText = `\`${selectedText}\``;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case "codeBlock":
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        cursorOffset = selectedText ? 0 : -4;
        break;
      case "quote":
        formattedText = `> ${selectedText}`;
        cursorOffset = 0;
        break;
      default:
        return;
    }

    const newText =
      currentText.substring(0, start) +
      formattedText +
      currentText.substring(end);

    setFormData((prev) => ({ ...prev, body: newText }));

    setTimeout(() => {
      const newCursorPos = start + formattedText.length + cursorOffset;
      inputElement.focus();
      inputElement.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) {
      showToast("Please select a date", "error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        summary: formData.summary,
        date: format(formData.date, "yyyy-MM-dd"),
        body: formData.body,
        status: formData.status,
        authorName: formData.authorName,
      };

      const response = isEditing
        ? await updateBlogService(id!, payload)
        : await createBlogService(payload);

      if (response.success) {
        showToast(
          isEditing
            ? "Blog updated successfully"
            : formData.status === "PUBLISHED"
            ? "Blog published successfully"
            : "Blog saved successfully",
          "success"
        );
        navigate("/manage-blogs");
      } else {
        showToast(
          response.message ||
            (isEditing ? "Failed to update blog" : "Failed to create blog"),
          "error"
        );
      }
    } catch (error) {
      console.error(isEditing ? "Error updating blog:" : "Error creating blog:", error);
      showToast(
        isEditing
          ? "Failed to update blog. Please try again."
          : "Failed to create blog. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };


  if (fetchingBlog) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground -ml-4"
          onClick={() => navigate("/manage-blogs")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Blogs
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your blog post details"
              : "Fill in the details to create a new blog post"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief summary of the blog post"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    placeholder="Enter author name"
                    value={formData.authorName}
                    onChange={(e) =>
                      handleInputChange("authorName", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? (
                          format(formData.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          setFormData((prev) => ({ ...prev, date }));
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "PUBLISHED" | "DRAFT") =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Content</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={!isPreviewMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreviewMode(false)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant={isPreviewMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPreviewMode(true)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="body">Blog Body</Label>
                {!isPreviewMode && (
                  <BlogFormatToolbar
                    onFormatClick={handleFormatClick}
                    className="mb-2"
                  />
                )}
                {!isPreviewMode ? (
                  <Textarea
                    ref={bodyTextareaRef}
                    id="body"
                    placeholder="Write your blog content here..."
                    value={formData.body}
                    onChange={(e) => handleInputChange("body", e.target.value)}
                    rows={15}
                    className="resize-y min-h-[300px]"
                    required
                  />
                ) : (
                  <div className="border border-border rounded-md p-4 min-h-[300px] bg-background">
                    {formData.body ? (
                      <div className="prose prose-invert max-w-none text-foreground/90">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {formData.body}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No content to preview. Start writing to see the preview.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    placeholder="Upload image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    disabled
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    disabled
                  >
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-start pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {formData.status === "PUBLISHED" ? "Publishing..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? "Update Blog" : formData.status === "PUBLISHED" ? "Publish Blog" : "Upload Blog"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};
