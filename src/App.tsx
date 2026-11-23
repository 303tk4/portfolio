import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage access errors
    }
  }, [locale]);

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
              {projects.length} {t.projectsCountSuffix}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
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
