import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface BlogPost {
  id: string;
  date: string;
  title: string;
  status: "published" | "draft";
  authors: {
    name: string;
    avatar?: string;
  }[];
}

const blogPosts: BlogPost[] = [
  {
    id: "cazza-ai-launch",
    date: "December 18th, 2025",
    title: "Cazza AI Launch",
    status: "published",
    authors: [
      { name: "James Wilson", avatar: "" },
      { name: "Sarah Chen", avatar: "" },
    ],
  },
  {
    id: "ecommerce-accounting-tips",
    date: "December 11th, 2025",
    title: "E-commerce Accounting Tips: December 2025",
    status: "published",
    authors: [
      { name: "Emma Roberts", avatar: "" },
      { name: "Michael Brown", avatar: "" },
    ],
  },
  {
    id: "vat-compliance-guide",
    date: "December 3rd, 2025",
    title: "VAT Compliance Guide for UK Sellers",
    status: "published",
    authors: [{ name: "David Thompson", avatar: "" }],
  },
  {
    id: "tiktok-shop-reconciliation",
    date: "October 21st, 2025",
    title: "TikTok Shop Reconciliation",
    status: "draft",
    authors: [
      { name: "Lisa Wang", avatar: "" },
      { name: "Tom Harris", avatar: "" },
    ],
  },
  {
    id: "amazon-seller-financial-planning",
    date: "October 9th, 2025",
    title: "Amazon Seller Financial Planning",
    status: "published",
    authors: [
      { name: "Rachel Green", avatar: "" },
      { name: "Chris Taylor", avatar: "" },
    ],
  },
  {
    id: "multi-channel-selling",
    date: "August 18th, 2025",
    title: "Multi-Channel Selling Success",
    status: "draft",
    authors: [{ name: "Andrew Miller", avatar: "" }],
  },
];

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

  const handleDelete = (id: string) => {
    console.log("Delete blog:", id);
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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

        <Card className="border border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Title</TableHead>
                  <TableHead className="text-muted-foreground">
                    Authors
                  </TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id} className="border-border">
                    <TableCell className="font-medium text-foreground max-w-[300px]">
                      <span className="line-clamp-1">{post.title}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {post.authors.slice(0, 3).map((author, idx) => (
                          <Avatar
                            key={idx}
                            className="w-8 h-8 border-2 border-card"
                          >
                            <AvatarImage
                              src={author.avatar}
                              alt={author.name}
                            />
                            <AvatarFallback
                              className={`text-xs text-white ${getAvatarColor(author.name)}`}
                            >
                              {getAuthorInitials(author.name)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {post.authors.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                            +{post.authors.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                        className={
                          post.status === "published"
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                        }
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/blog/${post.id}`)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/manage-blogs/edit/${post.id}`)
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
                                Are you sure you want to delete "{post.title}"?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(post.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
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

        {blogPosts.length === 0 && (
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
        )}
      </div>
    </ScrollArea>
  );
};
