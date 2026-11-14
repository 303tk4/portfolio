export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  status: string;
  featured: boolean;
}

export interface SiteProfile {
  name: string;
  role: string;
  bio: string;
  githubUrl: string;
  xUrl: string;
}
