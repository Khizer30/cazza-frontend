import { Italic, Underline, Strikethrough, Link as LinkIcon, List, Bold } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageFormatToolbarProps {
  onFormatClick: (format: string) => void;
  className?: string;
}

export const MessageFormatToolbar = ({ onFormatClick, className }: MessageFormatToolbarProps) => {
  const formatButtons = [
    { icon: Bold, format: "bold", label: "Bold" },
    { icon: Italic, format: "italic", label: "Italic" },
    { icon: Underline, format: "underline", label: "Underline" },
    { icon: Strikethrough, format: "strikethrough", label: "Strikethrough" },
    { icon: LinkIcon, format: "link", label: "Link" },
    { icon: List, format: "bulletList", label: "Bullet List" }
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-lg shadow-lg format-toolbar",
        className
      )}
      onMouseDown={(e) => {
        // Prevent input from losing focus when clicking toolbar
        e.preventDefault();
      }}
    >
      {formatButtons.map((button) => {
        const IconComponent = button.icon;
        return (
          <Button
            key={button.format}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted"
            onClick={() => onFormatClick(button.format)}
            title={button.label}
            type="button"
          >
            <IconComponent className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
};
