import {
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  List,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Code,
  FileCode,
  Quote
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogFormatToolbarProps {
  onFormatClick: (format: string) => void;
  className?: string;
}

export const BlogFormatToolbar = ({ onFormatClick, className }: BlogFormatToolbarProps) => {
  const formatButtons = [
    { icon: Bold, format: "bold", label: "Bold (Ctrl+B)" },
    { icon: Italic, format: "italic", label: "Italic (Ctrl+I)" },
    { icon: Underline, format: "underline", label: "Underline" },
    { icon: Strikethrough, format: "strikethrough", label: "Strikethrough" },
    { icon: Heading1, format: "heading1", label: "Heading 1" },
    { icon: Heading2, format: "heading2", label: "Heading 2" },
    { icon: Heading3, format: "heading3", label: "Heading 3" },
    { icon: LinkIcon, format: "link", label: "Link" },
    { icon: List, format: "bulletList", label: "Bullet List" },
    { icon: Code, format: "code", label: "Inline Code" },
    { icon: FileCode, format: "codeBlock", label: "Code Block" },
    { icon: Quote, format: "quote", label: "Quote" }
  ];

  return (
    <div
      className={cn("flex items-center gap-1 p-2 bg-muted/50 border border-border rounded-md", className)}
      onMouseDown={(e) => {
        // Prevent input from losing focus when clicking toolbar
        e.preventDefault();
      }}
    >
      {formatButtons.map((button, index) => {
        const IconComponent = button.icon;
        const showDivider = index === 4 || index === 7 || index === 9;

        return (
          <div key={button.format} className="flex items-center">
            {showDivider && <div className="w-px h-6 bg-border mx-1" />}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-background"
              onClick={() => onFormatClick(button.format)}
              title={button.label}
              type="button"
            >
              <IconComponent className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
