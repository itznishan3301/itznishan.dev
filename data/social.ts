export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string; // Lucide icon name
  username?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: '[ADD GITHUB URL]',
    icon: 'Github',
    username: '[ADD USERNAME]',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: '[ADD LINKEDIN URL]',
    icon: 'Linkedin',
    username: '[ADD USERNAME]',
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    url: '[ADD TWITTER URL]',
    icon: 'Twitter',
    username: '[ADD USERNAME]',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:[ADD YOUR EMAIL]',
    icon: 'Mail',
  },
];

export const emailContact = '[ADD YOUR EMAIL]';
