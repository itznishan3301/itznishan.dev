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
    id: 'exp-1',
    company: '[ADD COMPANY NAME]',
    role: '[ADD YOUR ROLE]',
    description: '[ADD ROLE DESCRIPTION]',
    startDate: '[START DATE]',
    endDate: '[END DATE or Present]',
    location: '[LOCATION or Remote]',
    type: 'full-time',
    techStack: ['[TECH1]', '[TECH2]'],
    highlights: [
      '[ADD KEY ACHIEVEMENT]',
      '[ADD KEY ACHIEVEMENT]',
    ],
  },
  {
    id: 'exp-2',
    company: '[ADD COMPANY NAME]',
    role: '[ADD YOUR ROLE]',
    description: '[ADD ROLE DESCRIPTION]',
    startDate: '[START DATE]',
    endDate: '[END DATE]',
    location: '[LOCATION]',
    type: 'full-time',
    techStack: ['[TECH1]'],
    highlights: [
      '[ADD KEY ACHIEVEMENT]',
    ],
  },
];
