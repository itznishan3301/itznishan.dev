import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="section-container section-padding !py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Left: Name + tagline + copyright */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              {personal.name}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {personal.title}
            </p>
            <p className="mt-2 text-[11px] text-[var(--color-text-muted)]">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]"
                aria-label={`Visit ${link.name}`}
              >
                <span>{link.name}</span>
                <ArrowUpRight
                  size={11}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
