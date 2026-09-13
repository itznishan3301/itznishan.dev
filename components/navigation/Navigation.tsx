"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { NAVIGATION_ITEMS } from "@/lib/utils/constants";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils/cn";
import { Menu, X, Download } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAVIGATION_ITEMS.map((item) =>
      item.href.replace("#", "")
    );

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuToggleRef.current?.focus();
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) closeMobileMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus trap: move focus into menu on open, return to toggle on close
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const firstFocusable = menu.querySelector<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = menu.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMobileMenu();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    },
    [closeMobileMenu]
  );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-[var(--z-navigation)] transition-all duration-300",
          isScrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md"
            : "bg-transparent",
          className
        )}
      >
        <nav className="section-container flex h-[var(--header-height)] items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-sm font-medium tracking-wide text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-secondary)]"
            aria-label="Back to top"
          >
            {personal.firstName}
            <span className="text-[var(--color-text-muted)]">.</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {NAVIGATION_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative py-1 text-xs font-mono uppercase tracking-widest transition-colors",
                    isActive
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                  {/* Active indicator line */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full bg-[var(--color-text-primary)]" />
                  )}
                </a>
              );
            })}

            {/* CV Download — always visible for recruiters */}
            <a
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]"
              aria-label="Download resume PDF"
            >
              <Download size={12} strokeWidth={1.5} />
              <span>CV</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={menuToggleRef}
            className="flex h-11 w-11 items-center justify-center text-[var(--color-text-secondary)] md:hidden"
            onClick={() => {
              if (isMobileMenuOpen) {
                closeMobileMenu();
              } else {
                setIsMobileMenuOpen(true);
              }
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-[calc(var(--z-navigation)-1)] flex flex-col justify-center bg-[var(--color-bg-primary)]/95 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col items-center gap-8">
            {NAVIGATION_ITEMS.map((item, i) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "text-2xl font-medium tracking-tight transition-colors",
                    isActive
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)]"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              );
            })}

            {/* CV Download in mobile menu */}
            <a
              href={personal.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
              aria-label="Download resume PDF"
              onClick={() => closeMobileMenu()}
            >
              <Download size={16} strokeWidth={1.5} />
              <span>Download CV</span>
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
