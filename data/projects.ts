export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  /** What problem this project solves */
  problem?: string;
  /** How the project solves it */
  solution?: string;
  /** Your role in the project */
  role?: string;
  tags: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '[ADD PROJECT TITLE]',
    description: '[ADD PROJECT DESCRIPTION]',
    longDescription: '[ADD LONGER PROJECT DESCRIPTION]',
    problem: '[ADD THE PROBLEM THIS PROJECT SOLVES]',
    solution: '[ADD YOUR SOLUTION APPROACH]',
    role: '[ADD YOUR ROLE — e.g. Full Stack Developer]',
    tags: ['[TAG1]', '[TAG2]'],
    techStack: ['[TECH1]', '[TECH2]', '[TECH3]'],
    image: '/images/projects/placeholder.jpg',
    liveUrl: '[ADD LIVE URL]',
    githubUrl: '[ADD GITHUB URL]',
    featured: true,
    year: '[YEAR]',
  },
  {
    id: 'project-2',
    title: '[ADD PROJECT TITLE]',
    description: '[ADD PROJECT DESCRIPTION]',
    problem: '[ADD THE PROBLEM THIS PROJECT SOLVES]',
    solution: '[ADD YOUR SOLUTION APPROACH]',
    role: '[ADD YOUR ROLE]',
    tags: ['[TAG1]', '[TAG2]'],
    techStack: ['[TECH1]', '[TECH2]'],
    image: '/images/projects/placeholder.jpg',
    githubUrl: '[ADD GITHUB URL]',
    featured: true,
    year: '[YEAR]',
  },
  {
    id: 'project-3',
    title: '[ADD PROJECT TITLE]',
    description: '[ADD PROJECT DESCRIPTION]',
    problem: '[ADD THE PROBLEM THIS PROJECT SOLVES]',
    solution: '[ADD YOUR SOLUTION APPROACH]',
    role: '[ADD YOUR ROLE]',
    tags: ['[TAG1]', '[TAG2]'],
    techStack: ['[TECH1]', '[TECH2]'],
    image: '/images/projects/placeholder.jpg',
    liveUrl: '[ADD LIVE URL]',
    featured: false,
    year: '[YEAR]',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
