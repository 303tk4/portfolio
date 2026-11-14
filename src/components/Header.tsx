import { Globe, Terminal } from 'lucide-react';
import { LOCALE_OPTIONS, resolveText, UI_TEXT } from '../i18n/translations';
import type { Locale, SiteProfile } from '../types/project';
import { GitHubIcon, XIcon } from './BrandIcons';

interface HeaderProps {
  profile: SiteProfile;
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
}

export function Header({ profile, locale, onChangeLocale }: HeaderProps) {
  const t = UI_TEXT[locale];
  const siteName = resolveText(profile.name, locale);
  const role = resolveText(profile.role, locale);
  const bio = resolveText(profile.bio, locale);

  return (
    <header className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
                <Terminal className="h-4.5 w-4.5" />
              </span>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {siteName}
                </h1>
              </div>
            </div>
            <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
              {role}
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {bio}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5 self-start">
            <div
              role="group"
              aria-label={t.languageSwitcherLabel}
              className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50/70 p-1"
            >
              <Globe
                aria-hidden="true"
                className="mx-1.5 h-3.5 w-3.5 shrink-0 text-slate-400"
              />
              {LOCALE_OPTIONS.map((option) => {
                const isActive = locale === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onChangeLocale(option.code)}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <nav
              aria-label={t.socialLinksLabel}
              className="flex items-center gap-2"
            >
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <GitHubIcon className="h-4.5 w-4.5" />
                </a>
              )}
              {profile.xUrl && (
                <a
                  href={profile.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <XIcon className="h-4 w-4" />
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
