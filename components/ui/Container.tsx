import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Narrow max-width (1000px) */
  narrow?: boolean;
  /** Text max-width (680px) */
  text?: boolean;
  /** Remove horizontal padding */
  flush?: boolean;
  /** HTML div element props */
  [key: string]: unknown;
}

export function Container({
  children,
  className,
  narrow = false,
  text = false,
  flush = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        !flush && "px-[var(--container-padding)]",
        text
          ? "max-w-[var(--max-width-text)]"
          : narrow
            ? "max-w-[var(--max-width-narrow)]"
            : "max-w-[var(--max-width)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
