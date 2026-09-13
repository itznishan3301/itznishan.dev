"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/admin");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="text-sm text-[var(--color-text-muted)]">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm font-medium text-[var(--color-text-primary)]">
              Admin
            </a>
            <span className="text-[var(--color-text-muted)]">|</span>
            <a href="/" className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]">
              View Site
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--color-text-muted)]">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Admin content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
