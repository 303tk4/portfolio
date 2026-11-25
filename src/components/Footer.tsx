import { UI_TEXT } from '../i18n/translations';
import type { Locale } from '../types/project';

const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  siteName: string;
  locale: Locale;
  privacyHref?: string;
}

export function Footer({ siteName, locale, privacyHref }: FooterProps) {
  const t = UI_TEXT[locale];

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {CURRENT_YEAR} {siteName}. Built with Vite, React & Tailwind CSS.</p>
        <div className="flex flex-wrap items-center gap-4">
          {privacyHref && (
            <a
              href={privacyHref}
              className="inline-flex items-center rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              プライバシーポリシー / Privacy Policy
            </a>
          )}
          <p className="font-mono text-[11px] text-slate-400">
            {t.footerUpdateHint}
          </p>
        </div>
      </div>
    </footer>
  );
}
