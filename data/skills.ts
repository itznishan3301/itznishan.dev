export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  description?: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Building interactive user interfaces and modern web experiences.',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'HeroUI' },
      { name: 'shadcn/ui' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend',
    description: 'Server-side development, APIs and database management.',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
      { name: 'MongoDB' },
      { name: 'Mongoose' },
      { name: 'Supabase' },
      { name: 'Authentication' },
    ],
  },
  {
    id: 'ai-workflow',
    category: 'AI & Development Workflow',
    description: 'AI-native development practices that accelerate engineering quality.',
    skills: [
      { name: 'AI-Assisted Development' },
      { name: 'Prompt Engineering' },
      { name: 'AI-Native Workflows' },
      { name: 'AI-Assisted Debugging' },
      { name: 'AI-Assisted Code Review' },
      { name: 'AI-Assisted Refactoring' },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Platforms',
    description: 'Development tools, deployment and infrastructure.',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VPS / Linux' },
      { name: 'Nginx' },
      { name: 'Deployment' },
    ],
  },
  {
    id: 'exploration',
    category: 'Exploration',
    description: 'Creative technology and experimental building.',
    skills: [
      { name: 'Three.js' },
      { name: 'React Three Fiber' },
      { name: '3D Modeling' },
      { name: '3D Printing' },
      { name: 'Python' },
      { name: 'Telegram Bots' },
    ],
  },
];

export const allSkills = skills.flatMap((category) => category.skills);
