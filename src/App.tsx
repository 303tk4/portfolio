import { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { TagFilter } from './components/TagFilter';
import projectsData from './data/projects.json';
import siteProfileData from './data/site.json';
import { isLocale, resolveText, UI_TEXT } from './i18n/translations';
import type { Locale, Project, SiteProfile } from './types/project';

const projects: Project[] = projectsData;
const siteProfile: SiteProfile = siteProfileData;
const LOCALE_STORAGE_KEY = 'portfolio-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'ja';
  }
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'ja';
}

export function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage access errors
    }
  }, [locale]);

  const { allTags, tagCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    const uniqueTags: string[] = [];

    for (const project of projects) {
      for (const tag of project.tags) {
        if (counts[tag] === undefined) {
          uniqueTags.push(tag);
          counts[tag] = 0;
        }
        counts[tag] += 1;
      }
    }

    return { allTags: uniqueTags, tagCounts: counts };
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [selectedTag]);

  const t = UI_TEXT[locale];
  const siteName = resolveText(siteProfile.name, locale);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/40 text-slate-900">
      <Header
        profile={siteProfile}
        locale={locale}
        onChangeLocale={setLocale}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <section aria-labelledby="works-heading" className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <h2
                id="works-heading"
                className="text-lg font-semibold tracking-tight text-slate-900"
              >
                {t.worksHeading}
              </h2>
              <p className="text-sm text-slate-500">{t.worksSubheading}</p>
            </div>
            <p className="font-mono text-xs text-slate-500 tabular-nums">
              {filteredProjects.length} / {projects.length} {t.projectsCountSuffix}
            </p>
          </div>

          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            totalCount={projects.length}
            tagCounts={tagCounts}
            locale={locale}
            onSelectTag={setSelectedTag}
          />

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-sm text-slate-500">{t.noMatchingProjects}</p>
            </div>
          )}
        </section>
      </main>

      <Footer siteName={siteName} locale={locale} />

      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
