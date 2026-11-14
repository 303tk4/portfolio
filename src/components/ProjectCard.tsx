import type { KeyboardEvent, MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { resolveText, UI_TEXT } from '../i18n/translations';
import type { Locale, Project } from '../types/project';
import { GitHubIcon } from './BrandIcons';
import { ProjectBadges } from './ProjectBadges';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, locale, onSelect }: ProjectCardProps) {
  const t = UI_TEXT[locale];
  const title = resolveText(project.title, locale);
  const tagline = resolveText(project.tagline, locale);
  const hasDemoUrl = project.demoUrl.trim().length > 0;
  const hasGithubUrl = project.githubUrl.trim().length > 0;

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${title}${t.viewDetailsPrefix}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleCardKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
    >
      <div className="border-b border-slate-100">
        <ProjectThumbnail
          src={project.image}
          alt={`${title}${t.screenshotAltSuffix}`}
          title={title}
          unavailableLabel={t.previewUnavailableLabel}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <ProjectBadges
            status={project.status}
            featured={project.featured}
            languages={project.languages}
            locale={locale}
          />
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
            {title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {tagline}
          </p>
        </div>

        {project.tags.length > 0 && (
          <ul
            aria-label={t.techStackHeading}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {(hasDemoUrl || hasGithubUrl) && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            {hasDemoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <span>{t.openAppLabel}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {hasGithubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>{t.githubLabel}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
