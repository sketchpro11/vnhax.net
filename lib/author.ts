import fs from 'fs';
import path from 'path';

/**
 * Single source of truth for the site's author.
 * Only real, verifiable facts go here (source: https://www.umarhashmi.dev).
 */
export const AUTHOR = {
  slug: 'umar-hashmi',
  name: 'Umar Hashmi',
  role: 'Founder & Editor, VNHAX',
  jobTitle: 'Full-Stack Web Developer & UI/UX Designer',
  shortBio:
    'Full-stack web developer since 2018, building AI tools and automations since 2022. I research each article from official announcements and documentation and update it when things change.',
  bio: [
    "I'm a full-stack web developer and UI/UX designer. I have worked as a freelancer since 2018, building websites and web apps mostly with React, Next.js, Node.js, Express and MongoDB, and designing the interfaces for them.",
    'Since 2022 I have been building AI-powered tools and automations with the OpenAI and Gemini APIs, and I use AI coding assistants and editors such as Claude, Cursor and Windsurf in my daily work.',
    'I started VNHAX in October 2026 to explain new AI models, developer tools and open-source projects in plain English, with links to the original sources so you can check everything yourself.',
  ],
  expertise: ['React & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'UI/UX design', 'AI APIs & automation'],
  url: 'https://www.umarhashmi.dev',
  links: [
    { label: 'Portfolio', url: 'https://www.umarhashmi.dev' },
    { label: 'GitHub', url: 'https://github.com/umarhashmi-dev' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/umarhashmi-dev' },
    { label: 'X / Twitter', url: 'https://x.com/umarhashmi_dev' },
  ],
  /**
   * Hardware actually used for hands-on testing. Leave empty until the author
   * confirms real specs — the "My Setup" section only renders when filled.
   */
  hardware: [
    'Laptop: Alienware x15 R2',
    'CPU: 12th Gen Intel Core i7-12700H',
    'GPU: NVIDIA GeForce RTX 3070 Ti Laptop GPU (8 GB VRAM) + Intel Iris Xe integrated graphics',
    'RAM: 16 GB',
    'OS: Windows 11 Pro (64-bit)',
  ] as string[],
};

export const AUTHOR_PAGE_PATH = `/author/${AUTHOR.slug}`;

const PHOTO_CANDIDATES = ['umar-hashmi.jpg', 'umar-hashmi.jpeg', 'umar-hashmi.png', 'umar-hashmi.webp'];

/** Public path of the author photo if one has been added to public/images, otherwise null. */
export function getAuthorPhoto(): string | null {
  for (const file of PHOTO_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'images', file))) {
      return `/images/${file}`;
    }
  }
  return null;
}

/** JSON-LD Person for the author, reused by article and profile pages. */
export function getAuthorSchema(siteUrl: string) {
  const photo = getAuthorPhoto();
  return {
    '@type': 'Person',
    '@id': `${siteUrl}${AUTHOR_PAGE_PATH}#person`,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: `${siteUrl}${AUTHOR_PAGE_PATH}`,
    ...(photo ? { image: `${siteUrl}${photo}` } : {}),
    sameAs: AUTHOR.links.map((l) => l.url),
    knowsAbout: AUTHOR.expertise,
  };
}
