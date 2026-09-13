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
    id: 'edu-1',
    institution: '[ADD INSTITUTION NAME]',
    degree: '[ADD DEGREE — e.g. Bachelor of Science]',
    field: '[ADD FIELD OF STUDY]',
    startDate: '[START YEAR]',
    endDate: '[END YEAR]',
    location: '[LOCATION]',
    gpa: '[ADD GPA if applicable]',
    highlights: [
      '[ADD ACHIEVEMENT or COURSE HIGHLIGHT]',
    ],
  },
];
