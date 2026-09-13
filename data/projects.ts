export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  role?: string;
  tags: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: 'asynctechbd',
    title: 'AsyncTechBD',
    description: 'A 3D-printing and maker-focused technology project exploring product development, 3D modeling workflows and manufacturing technology.',
    longDescription: 'AsyncTechBD is an independent technology and product-building project centered on 3D printing, maker culture and experimental hardware. The project explores the full pipeline from digital design to physical product — using tools like Fusion 360, TinkerCAD, Meshy AI and Tripo for 3D modeling, combined with hands-on manufacturing and iteration.',
    problem: 'Exploring how modern 3D printing technology, AI-assisted 3D modeling and maker workflows can be combined to build physical products from digital designs.',
    solution: 'Building an end-to-end product development pipeline using CAD software, AI-powered 3D generation tools and FDM/SLA 3D printing — iterating from concept to prototype to production.',
    role: 'Founder & Builder',
    tags: ['3D Printing', 'Product Development', 'Maker'],
    techStack: ['Fusion 360', 'TinkerCAD', 'Meshy AI', 'Tripo', '3D Printing'],
    image: '/images/projects/asynctechbd.jpg',
    featured: true,
    year: '2024',
  },
  {
    id: 'portfolio-website',
    title: 'itznishan.dev',
    description: 'A premium interactive portfolio website built with Next.js, Three.js and GSAP — featuring cinematic animations, 3D scenes and editorial design.',
    longDescription: 'This portfolio website is a production-quality interactive experience built with modern web technologies. It features cinematic GSAP animations, React Three Fiber 3D scenes, smooth Lenis scrolling, a custom cursor system and an editorial design language — all optimized for performance and accessibility.',
    problem: 'Creating a distinctive developer portfolio that demonstrates technical skill through the website itself, not just through project descriptions.',
    solution: 'Building a premium interactive experience where the website IS the project — using Three.js for 3D depth, GSAP for cinematic animations, and careful art direction for a high-end creative developer aesthetic.',
    role: 'Developer & Designer',
    tags: ['Portfolio', 'Interactive', '3D'],
    techStack: ['Next.js', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'],
    image: '/images/projects/portfolio.jpg',
    liveUrl: 'https://itznishan.dev',
    githubUrl: 'TODO_GITHUB_REPO_URL',
    featured: true,
    year: '2025',
  },
  {
    id: 'telegram-bot',
    title: 'Telegram Bot Project',
    description: 'A Telegram bot built with Python exploring conversational interfaces, API integration and bot development workflows.',
    problem: 'Exploring conversational interface design and server-side bot development.',
    solution: 'Built a Telegram bot using Python with API integration, exploring webhook patterns, message handling and deployment on VPS environments.',
    role: 'Developer',
    tags: ['Bot', 'Python', 'Automation'],
    techStack: ['Python', 'Telegram API', 'VPS', 'Nginx'],
    image: '/images/projects/telegram-bot.jpg',
    featured: false,
    year: '2024',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
