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
import { ArrowLeft, Plus, Trash2, Save, Image } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

interface BlogSection {
  id: string;
  heading: string;
  body: string;
  image: string;
}

interface BlogFormData {
  title: string;
  excerpt: string;
  status: "published" | "draft";
  authorName: string;
  authorHandle: string;
  sections: BlogSection[];
}

const existingBlogs: Record<string, BlogFormData> = {
  "cazza-ai-launch": {
    title: "Cazza AI Launch",
    excerpt: "Cazza AI is now available. Connect your Amazon, TikTok Shop, Shopify & Xero accounts securely and get instant financial insights powered by OpenAI.",
    status: "published",
    authorName: "James Wilson",
    authorHandle: "@jameswilson",
    sections: [
      {
        id: "1",
        heading: "",
        body: "Cazza AI focuses on providing instant financial insights for e-commerce sellers, with seamless integration to major platforms and accounting software.",
        image: "",
      },
      {
        id: "2",
        heading: "Multi-Platform Integration",
        body: "Cazza seamlessly connects to Amazon Seller Central, TikTok Shop, Shopify, and Xero. All connections use official APIs with bank-level encryption.",
        image: "/after.png",
      },
    ],
  },
  "ecommerce-accounting-tips": {
    title: "E-commerce Accounting Tips: December 2025",
    excerpt: "Essential accounting practices for e-commerce sellers. Learn how to streamline your bookkeeping and prepare for tax season with confidence.",
    status: "published",
    authorName: "Emma Roberts",
    authorHandle: "@emmaroberts",
    sections: [
      {
        id: "1",
        heading: "Keep Your Records Organized",
        body: "Maintain separate records for each sales platform. This makes reconciliation easier and ensures you can track performance across channels.",
        image: "",
      },
    ],
  },
};

export const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    status: "draft",
    authorName: "",
    authorHandle: "",
    sections: [
      {
        id: crypto.randomUUID(),
        heading: "",
        body: "",
        image: "",
      },
    ],
  });

  useEffect(() => {
    if (id && existingBlogs[id]) {
      setFormData(existingBlogs[id]);
    }
  }, [id]);

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (
    sectionId: string,
    field: keyof BlogSection,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: crypto.randomUUID(),
          heading: "",
          body: "",
          image: "",
        },
      ],
    }));
  };

  const removeSection = (sectionId: string) => {
    if (formData.sections.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting blog:", formData);
    navigate("/client/manage-blogs");
  };

  const handleSaveDraft = () => {
    setFormData((prev) => ({ ...prev, status: "draft" }));
    console.log("Saving as draft:", { ...formData, status: "draft" });
    navigate("/client/manage-blogs");
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground -ml-4"
          onClick={() => navigate("/client/manage-blogs")}
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
                <Label htmlFor="excerpt">Excerpt / Summary</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of the blog post"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
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
                  <Label htmlFor="authorHandle">Author Handle</Label>
                  <Input
                    id="authorHandle"
                    placeholder="@username"
                    value={formData.authorHandle}
                    onChange={(e) =>
                      handleInputChange("authorHandle", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "published" | "draft") =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Content Sections</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSection}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="p-4 border border-border rounded-lg space-y-4 bg-muted/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Section {index + 1}
                    </span>
                    {formData.sections.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Section Heading (optional)</Label>
                    <Input
                      placeholder="Enter section heading"
                      value={section.heading}
                      onChange={(e) =>
                        handleSectionChange(section.id, "heading", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      placeholder="Write your content here..."
                      value={section.body}
                      onChange={(e) =>
                        handleSectionChange(section.id, "body", e.target.value)
                      }
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL (optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter image URL"
                        value={section.image}
                        onChange={(e) =>
                          handleSectionChange(section.id, "image", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                    </div>
                    {section.image && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-border">
                        <img
                          src={section.image}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-none"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Update Blog" : "Publish Blog"}
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

