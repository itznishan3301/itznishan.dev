import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Remove default vertical padding */
  noPadding?: boolean;
  /** Use narrow max-width */
  narrow?: boolean;
  /** Add top border */
  bordered?: boolean;
  /** HTML section element props */
  [key: string]: unknown;
}

export function Section({
  children,
  className,
  id,
  noPadding = false,
  narrow = false,
  bordered = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        !noPadding && "section-padding",
        bordered && "border-t border-[var(--color-border)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "section-container",
          narrow && "section-container--narrow"
        )}
      >
        {children}
      </div>
    </section>
  );
}
