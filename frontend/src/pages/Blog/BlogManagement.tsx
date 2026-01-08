import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Edit, Eye, Image, Loader2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getBlogsService, deleteBlogService } from "@/services/blogService";
import type { Blog } from "@/types/auth";
import { useToast } from "@/components/ToastProvider";

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

export const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [totalBlogs, setTotalBlogs] = useState(0);
  const { showToast } = useToast();

  const fetchBlogs = async (status?: "PUBLISHED" | "DRAFT") => {
    try {
      setLoading(true);
      const response = await getBlogsService(status);
      if (response.success && response.data) {
        setBlogs(response.data);
        // Track total blogs when fetching all
        if (!status) {
          setTotalBlogs(response.data.length);
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statusFilter === "ALL") {
      fetchBlogs();
    } else {
      fetchBlogs(statusFilter);
    }
  }, [statusFilter]);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      const response = await deleteBlogService(id);

      if (response.success) {
        showToast("Blog deleted successfully", "success");
        fetchBlogs();
      } else {
        showToast(response.message || "Failed to delete blog", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      showToast("Failed to delete blog. Please try again.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Manage Blogs
              </h1>
              <p className="text-muted-foreground">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <Button
              onClick={() => navigate("/manage-blogs/create")}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">Filter by:</span>
            <Select
              value={statusFilter}
              onValueChange={(value: "ALL" | "PUBLISHED" | "DRAFT") => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Blogs</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : totalBlogs === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button
              onClick={() => navigate("/manage-blogs/create")}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Blog
            </Button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blogs found for the selected filter</p>
            <Button
              onClick={() => setStatusFilter("ALL")}
              variant="outline"
              className="border-border"
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          <Card className="border border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground w-[100px] px-4">
                      Image
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[250px] px-4">
                      Title
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[180px] px-4">
                      Author
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[180px] px-4">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground w-[120px] px-4">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right w-[140px] px-4">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id} className="border-border">
                      <TableCell className="px-4 py-4">
                        {blog.blogImage ? (
                          <img
                            src={blog.blogImage}
                            alt={blog.title}
                            className="w-16 h-16 rounded-md object-cover border border-border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-md bg-muted border border-border flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-foreground px-4 py-4">
                        <span className="truncate block max-w-[250px]">
                          {blog.title}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 border-2 border-card shrink-0">
                            <AvatarFallback
                              className={`text-xs text-white ${getAvatarColor(blog.authorName)}`}
                            >
                              {getAuthorInitials(blog.authorName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground truncate">
                            {blog.authorName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span className="whitespace-nowrap">{formatDate(blog.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <Badge
                          variant={
                            blog.status === "PUBLISHED" ? "default" : "secondary"
                          }
                          className={
                            blog.status === "PUBLISHED"
                              ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                              : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                          }
                        >
                          {blog.status === "PUBLISHED" ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/manage-blogs/edit/${blog.id}`)
                            }
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Blog Post
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this blog post? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(blog.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={deleting}
                                >
                                  {deleting ? (
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};
