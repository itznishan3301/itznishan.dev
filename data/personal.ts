export const personal = {
  name: 'Nuruzzaman Nishan',
  firstName: 'Nuruzzaman',
  lastName: 'Nishan',
  title: 'AI-Driven Developer',
  tagline: 'I build modern web experiences and AI-assisted products with a focus on thoughtful engineering, interactive interfaces and continuous experimentation.',
  description: 'AI-driven developer building modern web experiences, intelligent products and experimental technology. Currently developing skills in AI-driven full-stack web engineering through Programming Hero.',
  email: 'TODO_PROFILE_EMAIL',
  phone: 'TODO_PROFILE_PHONE',
  location: 'TODO_LOCATION',
  resumePath: '/resume',
  availability: 'Open to opportunities',
  profileImage: '/images/profile/nuruzzaman-nishan.jpg',

  // About section — editorial content
  about: {
    opening: 'I build modern web experiences and AI-assisted products — combining thoughtful engineering with continuous experimentation.',
    bio: [
      'I am an AI-driven developer focused on building modern web applications and intelligent products. My approach combines full-stack web development with AI-native workflows — using AI-assisted coding, debugging and refactoring as core parts of my engineering process.',
      'Currently developing my skills in AI-driven full-stack web engineering through Programming Hero, where I work with modern technologies like React, Next.js, TypeScript, Node.js and MongoDB while exploring how AI transforms the way we build software.',
    ],
    approach: [
      'Start with the problem, not the technology — understand what needs to be built before choosing how to build it.',
      'Use AI as a development multiplier — AI-assisted workflows for coding, debugging, review and refactoring accelerate quality output.',
      'Ship continuously — learning happens fastest when building real products and getting them into users hands.',
    ],
    closing: 'I am drawn to problems that sit at the intersection of web engineering, interactive experiences and intelligent systems — where thoughtful code meets real product impact.',
  },
} as const;

export type Personal = typeof personal;
