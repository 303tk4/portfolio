import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import projectsData from './data/projects.json';
import siteProfileData from './data/site.json';
import { isLocale, resolveText, UI_TEXT } from './i18n/translations';
import { KimagureAppPage } from './pages/KimagureAppPage';
import type { Locale, Project, SiteProfile } from './types/project';

const projects: Project[] = projectsData;
const siteProfile: SiteProfile = siteProfileData;
const LOCALE_STORAGE_KEY = 'portfolio-locale';
const KIMAGURE_ROUTE = '/kimagure-audiobookplayer';

function normalizePathname(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function getInitialPathname(): string {
  if (typeof window === 'undefined') {
    return '/';
  }
  return normalizePathname(window.location.pathname);
}

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
  const [pathname, setPathname] = useState<string>(getInitialPathname);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const kimagureProject = projects.find(
    (project) => project.detailPath === KIMAGURE_ROUTE,
  );
  const isKimagurePage =
    pathname === KIMAGURE_ROUTE && kimagureProject !== undefined;

  const t = UI_TEXT[locale];
  const siteName = resolveText(siteProfile.name, locale);

  const navigate = useCallback((to: string) => {
    const target = normalizePathname(to);
    if (typeof window !== 'undefined') {
      if (normalizePathname(window.location.pathname) !== target) {
        window.history.pushState({}, '', target);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    setSelectedProject(null);
    setPathname(target);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProject(null);
      setPathname(normalizePathname(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage access errors
    }
  }, [locale]);

  useEffect(() => {
    if (isKimagurePage && kimagureProject) {
      document.title = `${resolveText(kimagureProject.title, locale)} — ${siteName}`;
    } else {
      document.title = `${siteName} — Indie App Portfolio`;
    }
  }, [isKimagurePage, kimagureProject, locale, siteName]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/40 text-slate-900">
      <Header
        profile={siteProfile}
        locale={locale}
        onChangeLocale={setLocale}
        onNavigate={navigate}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {isKimagurePage && kimagureProject ? (
          <KimagureAppPage
            project={kimagureProject}
            locale={locale}
            onNavigate={navigate}
          />
        ) : (
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
                  onNavigate={navigate}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer
        siteName={siteName}
        locale={locale}
        privacyHref={
          isKimagurePage ? '/kimagure-audiobookplayer/privacy.html' : undefined
        }
      />

      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default App;
