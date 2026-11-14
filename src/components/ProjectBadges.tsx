import { Globe, Sparkles } from 'lucide-react';
import { formatAppLanguages, UI_TEXT } from '../i18n/translations';
import type { Locale } from '../types/project';
import { getStatusStyle } from '../utils/statusStyles';

interface ProjectBadgesProps {
  status: string;
  featured: boolean;
  languages?: string[];
  locale: Locale;
}

/**
 * Renders the project status badge, supported app languages badge, and featured indicator.
 */
export function ProjectBadges({
  status,
  featured,
  languages = [],
  locale,
}: ProjectBadgesProps) {
  const statusStyle = getStatusStyle(status);
  const t = UI_TEXT[locale];
  const statusLabel = t.statuses[status] ?? status;
  const hasLanguages = languages.length > 0;
  const languageSummary = hasLanguages
    ? formatAppLanguages(languages, locale)
    : '';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${statusStyle.badge}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
        {statusLabel}
      </span>

      {hasLanguages && (
        <span
          aria-label={`${t.supportedLanguagesLabel}: ${languageSummary}`}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
        >
          <Globe className="h-3 w-3 shrink-0 text-slate-500" />
          <span>{languageSummary}</span>
        </span>
      )}

      {featured && (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-slate-700">
          <Sparkles className="h-3 w-3 text-slate-500" />
          {t.featuredLabel}
        </span>
      )}
    </div>
  );
}
