export const personal = {
  name: 'Nuruzzaman Nishan',
  firstName: 'Nuruzzaman',
  lastName: 'Nishan',
  title: '[ADD YOUR TITLE — e.g. Full Stack Developer]',
  tagline: '[ADD YOUR TAGLINE]',
  description: '[ADD A BRIEF DESCRIPTION ABOUT YOURSELF]',
  email: '[ADD YOUR EMAIL]',
  phone: '[ADD YOUR PHONE NUMBER]',
  location: '[ADD YOUR LOCATION]',
  resumePath: '/resume/Nuruzzaman_Nishan_Resume.pdf',
  availability: '[ADD AVAILABILITY STATUS — e.g. Open to opportunities]',
  profileImage: '/images/profile/portrait.jpg',

  // About section — editorial content
  about: {
    opening: '[ADD OPENING STATEMENT — e.g. I build digital experiences that merge craft with code.]',
    bio: [
      '[ADD BIO PARAGRAPH 1 — your background, what drives you, your approach to development.]',
      '[ADD BIO PARAGRAPH 2 — expand on your expertise, the kind of work you enjoy.]',
    ],
    approach: [
      '[ADD APPROACH POINT 1 — e.g. Start with the problem, not the technology.]',
      '[ADD APPROACH POINT 2 — e.g. Every interaction should feel intentional.]',
      '[ADD APPROACH POINT 3 — e.g. Performance is a feature, not an afterthought.]',
    ],
    closing: '[ADD CLOSING STATEMENT — what kinds of problems you enjoy solving.]',
  },
} as const;

export type Personal = typeof personal;
