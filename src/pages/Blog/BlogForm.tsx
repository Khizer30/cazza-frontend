import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, CalendarIcon, Eye, Edit3, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import {
  createBlogService,
  getBlogDetailService,
  updateBlogService,
  deleteBlogImageService
} from "@/services/blogService";
import { useToast } from "@/components/ToastProvider";
import { BlogFormatToolbar } from "@/components/ClientComponents/BlogFormatToolbar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
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
    authorName: ""
  });
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [existingBlogImage, setExistingBlogImage] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [fetchingBlog, setFetchingBlog] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [deleteBlogImageDialog, setDeleteBlogImageDialog] = useState(false);
  const [deleteContentImageDialog, setDeleteContentImageDialog] = useState<string | null>(null);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const blogImageInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

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
              authorName: blog.authorName
            });
            if (blog.blogImage) {
              setExistingBlogImage(blog.blogImage);
            }
            if (blog.images && blog.images.length > 0) {
              setExistingImages(blog.images);
            }
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

  useEffect(() => {
    return () => {
      if (blogImagePreview) {
        URL.revokeObjectURL(blogImagePreview);
      }
      imagesPreview.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [blogImagePreview, imagesPreview]);

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast("Image size should be less than 10MB", "error");
      return;
    }

    setBlogImage(file);
    const url = URL.createObjectURL(file);
    setBlogImagePreview(url);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        showToast(`${file.name} is not an image file`, "error");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast(`${file.name} size should be less than 10MB`, "error");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setImages((prev) => [...prev, ...validFiles]);
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => [...prev, ...previews]);
  };

  const handleRemoveBlogImage = () => {
    if (blogImagePreview) {
      URL.revokeObjectURL(blogImagePreview);
    }
    setBlogImage(null);
    setBlogImagePreview(null);
    if (blogImageInputRef.current) {
      blogImageInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagesPreview];
    URL.revokeObjectURL(newPreviews[index]);
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagesPreview(newPreviews);
  };

  const handleRemoveExistingImage = async (imageUrl: string) => {
    if (!id) return;

    try {
      setDeletingImage(true);
      const response = await deleteBlogImageService(id, imageUrl);
      if (response.success) {
        setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
        showToast("Image deleted successfully", "success");
      } else {
        showToast(response.message || "Failed to delete image", "error");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      showToast("Failed to delete image. Please try again.", "error");
    } finally {
      setDeletingImage(false);
      setDeleteContentImageDialog(null);
    }
  };

  const handleRemoveExistingBlogImage = async () => {
    if (!id || !existingBlogImage) return;

    try {
      setDeletingImage(true);
      const response = await deleteBlogImageService(id, existingBlogImage);
      if (response.success) {
        setExistingBlogImage(null);
        showToast("Blog image deleted successfully", "success");
      } else {
        showToast(response.message || "Failed to delete image", "error");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      showToast("Failed to delete image. Please try again.", "error");
    } finally {
      setDeletingImage(false);
      setDeleteBlogImageDialog(false);
    }
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

    const newText = currentText.substring(0, start) + formattedText + currentText.substring(end);

    setFormData((prev) => ({ ...prev, body: newText }));

    setTimeout(() => {
      const newCursorPos = start + formattedText.length + cursorOffset;
      inputElement.focus();
      inputElement.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("Please enter a title", "error");
      return;
    }

    if (!formData.summary.trim()) {
      showToast("Please enter a summary", "error");
      return;
    }

    if (!formData.authorName.trim()) {
      showToast("Please enter an author name", "error");
      return;
    }

    if (!formData.date) {
      showToast("Please select a date", "error");
      return;
    }

    if (!formData.body.trim()) {
      showToast("Please enter blog content", "error");
      return;
    }

    if (!formData.status) {
      showToast("Please select a status", "error");
      return;
    }

    if (!blogImage && !existingBlogImage) {
      showToast("Please upload a blog image", "error");
      return;
    }

    if (images.length === 0 && existingImages.length === 0) {
      showToast("Please upload at least one content image", "error");
      return;
    }

    try {
      setLoading(true);

      const dateISO = formData.date.toISOString();

      const payload = {
        title: formData.title,
        summary: formData.summary,
        date: dateISO,
        body: formData.body,
        status: formData.status,
        authorName: formData.authorName,
        blogImage: blogImage || undefined,
        images: images.length > 0 ? images : undefined
      };

      const response = isEditing ? await updateBlogService(id!, payload) : await createBlogService(payload);

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
        showToast(response.message || (isEditing ? "Failed to update blog" : "Failed to create blog"), "error");
      }
    } catch (error) {
      console.error(isEditing ? "Error updating blog:" : "Error creating blog:", error);
      showToast(
        isEditing ? "Failed to update blog. Please try again." : "Failed to create blog. Please try again.",
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
            {isEditing ? "Update your blog post details" : "Fill in the details to create a new blog post"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary *</Label>
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
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input
                    id="authorName"
                    placeholder="Enter author name"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange("authorName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
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
                  onValueChange={(value: "PUBLISHED" | "DRAFT") => handleInputChange("status", value)}
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
                <Label htmlFor="body">Blog Body *</Label>
                {!isPreviewMode && <BlogFormatToolbar onFormatClick={handleFormatClick} className="mb-2" />}
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.body}</ReactMarkdown>
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
                <Label htmlFor="blogImage">Blog Image *</Label>
                {existingBlogImage && !blogImage && (
                  <div className="relative inline-block mb-2">
                    <img
                      src={existingBlogImage}
                      alt="Current blog image"
                      className="h-32 w-auto rounded-md border border-border object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setDeleteBlogImageDialog(true)}
                      disabled={deletingImage}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                {blogImagePreview && (
                  <div className="relative inline-block mb-2">
                    <img
                      src={blogImagePreview}
                      alt="Preview"
                      className="h-32 w-auto rounded-md border border-border object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={handleRemoveBlogImage}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                {!existingBlogImage && !blogImage && (
                  <Input
                    id="blogImage"
                    type="file"
                    accept="image/*"
                    ref={blogImageInputRef}
                    onChange={handleBlogImageChange}
                    className="cursor-pointer"
                  />
                )}
                {existingBlogImage && !blogImage && (
                  <AlertDialog open={deleteBlogImageDialog} onOpenChange={setDeleteBlogImageDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Image</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this blog image? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={deletingImage}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleRemoveExistingBlogImage}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deletingImage}
                        >
                          {deletingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Content Images *</Label>
                {existingImages.length > 0 && images.length === 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {existingImages.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imageUrl}
                          alt={`Existing image ${index + 1}`}
                          className="h-24 w-24 rounded-md border border-border object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => setDeleteContentImageDialog(imageUrl)}
                          disabled={deletingImage}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {imagesPreview.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {imagesPreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-24 rounded-md border border-border object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="relative">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    ref={imagesInputRef}
                    onChange={handleImagesChange}
                    className="cursor-pointer opacity-0 absolute w-full h-full z-10"
                  />
                  <div
                    onClick={() => imagesInputRef.current?.click()}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer items-center"
                  >
                    <span className="text-muted-foreground">
                      {images.length > 0
                        ? `${images.length} file${images.length > 1 ? "s" : ""} chosen`
                        : "Choose Files"}
                    </span>
                  </div>
                </div>
                <AlertDialog
                  open={deleteContentImageDialog !== null}
                  onOpenChange={(open) => !open && setDeleteContentImageDialog(null)}
                >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Content Image</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this content image? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={deletingImage}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteContentImageDialog && handleRemoveExistingImage(deleteContentImageDialog)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deletingImage}
                      >
                        {deletingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-start pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
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
