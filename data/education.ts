export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  highlights?: string[];
}

export const education: Education[] = [
  {
    id: 'edu-programming-hero',
    institution: 'Programming Hero',
    degree: 'Complete Web Development Course',
    field: 'AI-Driven Full-Stack Web Engineering',
    startDate: '2024',
    endDate: 'Present',
    location: 'Online',
    highlights: [
      'Modern full-stack web development with React, Next.js, TypeScript and Node.js',
      'AI-native development workflows including AI-assisted coding, debugging and refactoring',
      'Product thinking, requirement analysis, PRD creation and prototyping',
      'Database design with MongoDB, authentication systems and role-based access control',
      'Deployment, Git workflow and professional software engineering practices',
    ],
  },
];
