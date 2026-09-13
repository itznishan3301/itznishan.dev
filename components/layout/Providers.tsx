"use client";

import { AuthProvider } from "@/lib/auth-context";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
    </AuthProvider>
  );
}
