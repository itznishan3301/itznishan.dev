export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-medium text-[var(--color-text-primary)]">
        Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Profile", href: "/admin/profile", description: "Manage your personal information" },
          { label: "Projects", href: "/admin/projects", description: "Manage portfolio projects" },
          { label: "Skills", href: "/admin/skills", description: "Manage skill categories and items" },
          { label: "Experience", href: "/admin/experience", description: "Manage work experience" },
          { label: "Education", href: "/admin/education", description: "Manage education entries" },
          { label: "Resume", href: "/admin/resume", description: "Manage resume data" },
          { label: "Social Links", href: "/admin/social", description: "Manage social media links" },
          { label: "Site Settings", href: "/admin/settings", description: "Configure site-wide settings" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-tertiary)]"
          >
            <h3 className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">
              {item.label}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
