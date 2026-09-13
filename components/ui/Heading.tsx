import { cn } from "@/lib/utils/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  /** Display as label above the heading */
  label?: string;
  /** Render heading text as gradient */
  gradient?: boolean;
  /** Balance text wrapping */
  balanced?: boolean;
}

export function Heading({
  as: Tag = "h2",
  children,
  className,
  label,
  gradient = false,
  balanced = false,
}: HeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <span className="text-label">{label}</span>
      )}
      <Tag
        className={cn(
          gradient && "text-gradient",
          balanced && "text-balance"
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
