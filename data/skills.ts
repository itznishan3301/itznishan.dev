export interface Skill {
  name: string;
  icon?: string;
  proficiency?: number; // 1-100
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
    description: '[ADD DESCRIPTION]',
    skills: [
      { name: '[SKILL NAME]', proficiency: 0 },
      { name: '[SKILL NAME]', proficiency: 0 },
      { name: '[SKILL NAME]', proficiency: 0 },
    ],
  },
  {
    id: 'backend',
    category: 'Backend',
    description: '[ADD DESCRIPTION]',
    skills: [
      { name: '[SKILL NAME]', proficiency: 0 },
      { name: '[SKILL NAME]', proficiency: 0 },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & DevOps',
    description: '[ADD DESCRIPTION]',
    skills: [
      { name: '[SKILL NAME]', proficiency: 0 },
      { name: '[SKILL NAME]', proficiency: 0 },
    ],
  },
  {
    id: 'other',
    category: 'Other',
    description: '[ADD DESCRIPTION]',
    skills: [
      { name: '[SKILL NAME]', proficiency: 0 },
    ],
  },
];

export const allSkills = skills.flatMap((category) => category.skills);
