/**
 * Resume data model — structured for PDF generation and printable resume page.
 * All content sourced from centralized data files.
 */
import { personal } from "./personal";
import { skills } from "./skills";
import { projects } from "./projects";
import { experiences } from "./experience";
import { education } from "./education";
import { socialLinks } from "./social";

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    location: string;
    website: string;
    github?: string;
    linkedin?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    name: string;
    description: string;
    techStack: string[];
    url?: string;
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    program: string;
    period: string;
    highlights: string[];
  }[];
  links: {
    name: string;
    url: string;
  }[];
}

export function getResumeData(): ResumeData {
  const githubLink = socialLinks.find((l) => l.id === "github");
  const linkedinLink = socialLinks.find((l) => l.id === "linkedin");

  return {
    name: personal.name,
    title: personal.title,
    summary: personal.description,
    contact: {
      email: personal.email,
      location: personal.location,
      website: "https://itznishan.dev",
      github: githubLink?.url.startsWith("http") ? githubLink.url : undefined,
      linkedin: linkedinLink?.url.startsWith("http") ? linkedinLink.url : undefined,
    },
    skills: skills.map((cat) => ({
      category: cat.category,
      items: cat.skills.map((s) => s.name),
    })),
    projects: projects
      .filter((p) => p.featured)
      .map((p) => ({
        name: p.title,
        description: p.description,
        techStack: p.techStack,
        url: p.liveUrl?.startsWith("http") ? p.liveUrl : undefined,
      })),
    experience: experiences.map((exp) => ({
      company: exp.company,
      role: exp.role,
      period: `${exp.startDate} — ${exp.endDate}`,
      description: exp.description,
      highlights: exp.highlights || [],
    })),
    education: education.map((edu) => ({
      institution: edu.institution,
      program: `${edu.degree} — ${edu.field}`,
      period: `${edu.startDate} — ${edu.endDate}`,
      highlights: edu.highlights || [],
    })),
    links: socialLinks
      .filter((l) => l.url.startsWith("http"))
      .map((l) => ({ name: l.name, url: l.url })),
  };
}
