import ReactMarkdown from "react-markdown";
// Component to format AI responses with markdown
export function FormattedMessage({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-2 text-foreground">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-foreground">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
