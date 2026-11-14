export type Locale = 'ja' | 'en' | 'zh-TW';

export type LocalizedString = string | Partial<Record<Locale, string>>;
export type LocalizedStringArray = string[] | Partial<Record<Locale, string[]>>;

export interface Project {
  id: string;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedStringArray;
  image: string;
  tags: string[];
  languages?: string[];
  demoUrl: string;
  githubUrl: string;
  status: string;
  featured: boolean;
}

export interface SiteProfile {
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  githubUrl: string;
  xUrl: string;
}
