import { cn } from "@/lib/utils/cn";
import { ArrowUpRight } from "lucide-react";

interface TextLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  /** Show external arrow icon */
  external?: boolean;
  /** Show underline animation */
  animated?: boolean;
  /** Open in new tab */
  newTab?: boolean;
}

export function TextLink({
  children,
  href,
  className,
  external = false,
  animated = true,
  newTab = true,
}: TextLinkProps) {
  const isExternal = external || href.startsWith("http");

  return (
    <a
      href={href}
      className={cn(
        animated ? "link-animated" : "link-underline",
        className
      )}
      target={isExternal && newTab ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
      {isExternal && (
        <span className="link-arrow ml-1 inline-flex">
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </span>
      )}
    </a>
  );
}
