interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export const MarkdownMessage = ({ content, className }: MarkdownMessageProps) => {
  // Process markdown syntax to HTML
  let processedContent = content;

  // Handle bold, italic, strikethrough, underline first (before splitting by newlines)
  // Bold: **text** (must be before italic to avoid conflicts)
  // Using [\s\S] instead of . to match newlines as well
  processedContent = processedContent.replace(/\*\*([\s\S]+?)\*\*/g, '<strong class="font-bold">$1</strong>');
  // Italic: *text*
  processedContent = processedContent.replace(/\*([\s\S]+?)\*/g, '<em class="italic">$1</em>');
  // Strikethrough: ~~text~~
  processedContent = processedContent.replace(/~~([\s\S]+?)~~/g, '<del class="line-through">$1</del>');
  // Underline: __text__
  processedContent = processedContent.replace(/__([\s\S]+?)__/g, '<u class="underline">$1</u>');
  // Links: [text](url)
  processedContent = processedContent.replace(
    /\[([\s\S]+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>'
  );

  // Handle lists and line breaks
  const lines = processedContent.split("\n");
  const processedLines = lines.map((line) => {
    // Bullet list: - item or • item
    if (line.trim().startsWith("- ")) {
      return "• " + line.trim().substring(2);
    }
    // Numbered list: 1. item
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      return numberedMatch[1] + ". " + numberedMatch[2];
    }
    return line;
  });

  processedContent = processedLines.join("<br/>");

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: processedContent
      }}
    />
  );
};
