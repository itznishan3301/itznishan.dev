import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as anchor tag */
  href?: string;
  /** Icon element to show before text */
  icon?: React.ReactNode;
  /** Icon element to show after text */
  iconRight?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost: "btn btn-ghost",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      icon,
      iconRight,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {icon && <span className="inline-flex shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
