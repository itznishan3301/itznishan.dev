export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'TODO_GITHUB_URL',
    icon: 'Github',
    username: 'TODO_GITHUB_USERNAME',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'TODO_LINKEDIN_URL',
    icon: 'Linkedin',
    username: 'TODO_LINKEDIN_USERNAME',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:TODO_PROFILE_EMAIL',
    icon: 'Mail',
  },
];

export const emailContact = 'TODO_PROFILE_EMAIL';
