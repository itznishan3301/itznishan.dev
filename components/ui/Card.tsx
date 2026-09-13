import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Card variant */
  variant?: "default" | "flush" | "ghost";
  /** Make the card interactive (hover effects) */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML element props */
  [key: string]: unknown;
}

export function Card({
  children,
  className,
  variant = "default",
  interactive = false,
  onClick,
  ...props
}: CardProps) {
  const baseStyles = variant === "default"
    ? "card"
    : variant === "flush"
      ? "card-flush"
      : "card-ghost";

  return (
    <div
      className={cn(
        baseStyles,
        interactive && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive && onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}
