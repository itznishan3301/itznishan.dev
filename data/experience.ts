export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  techStack?: string[];
  highlights?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'exp-asynctechbd',
    company: 'AsyncTechBD',
    role: 'Founder & Builder',
    description: 'Independent 3D-printing and maker technology project — exploring product development from digital design to physical manufacturing.',
    startDate: '2024',
    endDate: 'Present',
    location: 'Remote',
    type: 'freelance',
    techStack: ['3D Printing', 'Fusion 360', 'Meshy AI', 'Product Development'],
    highlights: [
      'Building end-to-end product development workflows using CAD and AI-assisted 3D modeling',
      'Exploring manufacturing technology including FDM 3D printing and material science',
      'Working with AI-powered 3D generation tools (Meshy AI, Tripo) for rapid prototyping',
    ],
  },
  {
    id: 'exp-portfolio',
    company: 'Independent',
    role: 'Web Developer',
    description: 'Building modern web experiences and interactive applications using AI-driven development workflows.',
    startDate: '2024',
    endDate: 'Present',
    location: 'Remote',
    type: 'freelance',
    techStack: ['Next.js', 'TypeScript', 'React', 'Node.js', 'AI-Assisted Development'],
    highlights: [
      'Developing full-stack web applications with modern frameworks and AI-native workflows',
      'Building interactive frontend experiences with Three.js, GSAP and advanced CSS',
      'Practicing AI-assisted coding, debugging and refactoring as core engineering methodology',
    ],
  },
];
