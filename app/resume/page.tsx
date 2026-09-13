import { getResumeData } from "@/data/resume";
import { personal } from "@/data/personal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Resume — ${personal.name}`,
  description: `Professional resume of ${personal.name}, ${personal.title}.`,
};

export default function ResumePage() {
  const resume = getResumeData();

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-gray-900 print:px-0 print:py-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {resume.name}
          </h1>
          <p className="mt-1 text-lg text-gray-600">{resume.title}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            <span>{resume.contact.email}</span>
            {resume.contact.location !== "TODO_LOCATION" && (
              <span>{resume.contact.location}</span>
            )}
            <span>{resume.contact.website}</span>
            {resume.contact.github && (
              <a href={resume.contact.github} className="text-blue-600 hover:underline">
                GitHub
              </a>
            )}
            {resume.contact.linkedin && (
              <a href={resume.contact.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-800">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{resume.summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {resume.skills.map((cat) => (
              <div key={cat.category}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {cat.category}
                </p>
                <p className="text-sm text-gray-700">{cat.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
            Projects
          </h2>
          <div className="flex flex-col gap-4">
            {resume.projects.map((project) => (
              <div key={project.name}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {project.url ? (
                      <a href={project.url} className="text-blue-700 hover:underline">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {project.techStack.slice(0, 3).join(" · ")}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
            Experience
          </h2>
          <div className="flex flex-col gap-4">
            {resume.experience.map((exp) => (
              <div key={exp.company + exp.role}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-xs text-gray-400">{exp.period}</span>
                </div>
                <p className="text-xs text-gray-500">{exp.company}</p>
                <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-800">
            Education & Learning
          </h2>
          <div className="flex flex-col gap-4">
            {resume.education.map((edu) => (
              <div key={edu.institution}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{edu.institution}</h3>
                  <span className="text-xs text-gray-400">{edu.period}</span>
                </div>
                <p className="text-xs text-gray-500">{edu.program}</p>
                {edu.highlights.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-gray-200 pt-4 text-center print:hidden">
          <p className="text-xs text-gray-400">
            {resume.name} — {resume.contact.website}
          </p>
        </footer>
      </div>
    </main>
  );
}
