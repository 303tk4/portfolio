import { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { resolveList, resolveText, UI_TEXT } from '../i18n/translations';
import type { Locale, Project } from '../types/project';
import { GitHubIcon } from './BrandIcons';
import { ProjectBadges } from './ProjectBadges';
import { ProjectShowcaseGallery } from './ProjectShowcaseGallery';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectModalProps {
  project: Project | null;
  locale: Locale;
  onClose: () => void;
}

export function ProjectModal({ project, locale, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const t = UI_TEXT[locale];
  const title = resolveText(project.title, locale);
  const tagline = resolveText(project.tagline, locale);
  const description = resolveText(project.description, locale);
  const highlights = resolveList(project.highlights, locale);
  const hasDemoUrl = project.demoUrl.trim().length > 0;
  const hasGithubUrl = project.githubUrl.trim().length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs sm:p-6"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closeModalLabel}
          className="absolute top-3.5 right-3.5 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-600 shadow-xs backdrop-blur-xs transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="border-b border-slate-100">
          {project.screenshots ? (
            <ProjectShowcaseGallery
              screenshots={project.screenshots}
              title={title}
              altSuffix={t.modalPreviewAltSuffix}
              compact
            />
          ) : (
            <ProjectThumbnail
              src={project.image}
              alt={`${title}${t.modalPreviewAltSuffix}`}
              title={title}
              unavailableLabel={t.previewUnavailableLabel}
            />
          )}
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <ProjectBadges
              status={project.status}
              featured={project.featured}
              languages={project.languages}
              locale={locale}
            />

            <div>
              <h2
                id="modal-project-title"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                {title}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                {tagline}
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              {t.overviewHeading}
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              {description}
            </p>
          </section>

          {highlights.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t.highlightsHeading}
              </h3>
              <ul className="space-y-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.tags.length > 0 && (
            <section className="space-y-2.5">
              <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t.techStackHeading}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(hasDemoUrl || hasGithubUrl) && (
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
              {hasDemoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <span>{t.openAppLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {hasGithubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                >
                  <GitHubIcon className="h-4 w-4" />
                  <span>{t.githubLabel}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
