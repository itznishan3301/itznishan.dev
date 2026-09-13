import { ArrowUpRight, ArrowDown } from "lucide-react";
import {
  Section,
  Heading,
  Button,
  MagneticButton,
  Card,
  Reveal,
  TextLink,
} from "@/components/ui";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="relative">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── About ────────────────────────────────────────────── */}
      <Section id="about" bordered>
        <div className="grid-split">
          <Reveal>
            <Heading label="01 — About" as="h2">
              Who I Am
            </Heading>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p className="text-body">
                [ADD A PARAGRAPH ABOUT YOURSELF — your background, what drives
                you, your approach to development. This should be 2-3 sentences
                that give visitors a sense of who you are.]
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-body">
                [ADD A SECOND PARAGRAPH — expand on your expertise, the kind of
                work you enjoy, or your current focus. Keep it concise and
                professional.]
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="badge">[LOCATION]</span>
                <span className="badge">[AVAILABILITY]</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <Section id="skills" bordered>
        <Reveal>
          <Heading label="02 — Skills" as="h2" className="mb-16">
            What I Work With
          </Heading>
        </Reveal>

        <div className="grid-auto">
          {["Frontend", "Backend", "Tools & DevOps"].map((category, i) => (
            <Reveal key={category} delay={i * 0.1}>
              <Card>
                <h4 className="mb-6 text-[var(--text-lg)] font-medium">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className="tag">
                      [SKILL {n}]
                    </span>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <Section id="projects" bordered>
        <Reveal>
          <Heading label="03 — Projects" as="h2" className="mb-16">
            Selected Work
          </Heading>
        </Reveal>

        <div className="grid-2">
          {[1, 2].map((project, i) => (
            <Reveal key={project} delay={i * 0.1}>
              <Card variant="flush" interactive data-cursor="view">
                <div className="aspect-[16/10] w-full bg-[var(--color-bg-tertiary)]" />
                <div className="p-6 md:p-8">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[var(--text-2xl)] font-medium">
                      [PROJECT {project}]
                    </h3>
                    <span className="text-label">[YEAR]</span>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    [ADD PROJECT DESCRIPTION — one or two sentences about what
                    this project does and your role in it.]
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="tag">[TECH 1]</span>
                    <span className="tag">[TECH 2]</span>
                    <span className="tag">[TECH 3]</span>
                  </div>
                  <TextLink href="#">View Project</TextLink>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Experience ───────────────────────────────────────── */}
      <Section id="experience" bordered>
        <Reveal>
          <Heading label="04 — Experience" as="h2" className="mb-16">
            Where I&apos;ve Worked
          </Heading>
        </Reveal>

        <div className="flex flex-col divide-y divide-[var(--color-border)]">
          {[
            { role: "[ROLE]", company: "[COMPANY]", period: "[PERIOD]" },
            { role: "[ROLE]", company: "[COMPANY]", period: "[PERIOD]" },
          ].map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid-split items-center py-8">
                <div>
                  <p className="text-label mb-1">{exp.period}</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">
                    {exp.company}
                  </p>
                </div>
                <div>
                  <h3 className="text-[var(--text-2xl)] font-medium">
                    {exp.role}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    [ADD ROLE DESCRIPTION — what you did, key responsibilities,
                    and impact.]
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <Section id="contact" bordered className="min-h-[70vh] flex flex-col justify-center">
        <div className="text-center">
          <Reveal>
            <Heading label="05 — Contact" as="h2" gradient>
              Let&apos;s Work Together
            </Heading>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-body mx-auto mt-6 max-w-lg">
              [ADD CONTACT INTRODUCTION — a brief message inviting visitors to
              reach out. Mention what kind of opportunities you&apos;re looking
              for.]
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button
                  href="mailto:[ADD YOUR EMAIL]"
                  variant="primary"
                  icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
                >
                  Send Email
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button href="[ADD YOUR LINKEDIN URL]" variant="outline">
                  LinkedIn
                </Button>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-16 text-label">
              [ADD YOUR EMAIL]
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)]">
        <div className="section-container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Nuruzzaman Nishan. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((name) => (
              <a
                key={name}
                href="#"
                className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
