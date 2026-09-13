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
} as const;

export type Personal = typeof personal;
