import type { KeyboardEvent, MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { resolveList, resolveText, UI_TEXT } from '../i18n/translations';
import type { Locale, Project } from '../types/project';
import { GitHubIcon } from './BrandIcons';
import { ProjectBadges } from './ProjectBadges';
import { ProjectShowcaseGallery } from './ProjectShowcaseGallery';
import { ProjectThumbnail } from './ProjectThumbnail';
import { ProjectSubtitleNames } from './ProjectTitleBlock';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  onSelect: (project: Project) => void;
  onNavigate?: (path: string) => void;
}

export function ProjectCard({
  project,
  locale,
  onSelect,
  onNavigate,
}: ProjectCardProps) {
  const t = UI_TEXT[locale];
  const title = resolveText(project.title, locale);
  const tagline = resolveText(project.tagline, locale);
  const description = resolveText(project.description, locale);
  const highlights = resolveList(project.highlights, locale);
  const detailPath = project.detailPath?.trim() ?? '';
  const hasDetailPath = detailPath.length > 0;
  const hasDemoUrl = project.demoUrl.trim().length > 0;
  const hasGithubUrl = project.githubUrl.trim().length > 0;
  const isHero = Boolean(project.hero);

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleDetailClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (!onNavigate || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate(detailPath);
  };

  const renderTags = (marginTop: string) =>
    project.tags.length > 0 && (
      <ul
        aria-label={t.techStackHeading}
        className={`${marginTop} flex flex-wrap gap-1.5`}
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
    );

  const renderActions = (
    hasDetail: boolean,
    hasDemo: boolean,
    hasGithub: boolean,
    marginTop: string,
  ) =>
    (hasDetail || hasDemo || hasGithub) && (
      <div
        className={`${marginTop} flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4`}
      >
        {hasDetail && (
          <a
            href={detailPath}
            onClick={handleDetailClick}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <span>{t.openDetailPageLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
        {hasDemo && (
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
        {hasGithub && (
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
    );

  const badges = (
    <ProjectBadges
      status={project.status}
      featured={project.featured}
      languages={project.languages}
      locale={locale}
    />
  );

  if (isHero) {
    return (
      <article
        role="button"
        tabIndex={0}
        aria-label={`${title}${t.viewDetailsPrefix}`}
        onClick={() => onSelect(project)}
        onKeyDown={handleCardKeyDown}
        className="group grid cursor-pointer grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:col-span-2 lg:col-span-3 lg:grid-cols-12"
      >
        <div className="border-b border-slate-100 lg:col-span-7 lg:border-r lg:border-b-0">
          {project.screenshots ? (
            <ProjectShowcaseGallery
              screenshots={project.screenshots}
              title={title}
              altSuffix={t.screenshotAltSuffix}
            />
          ) : (
            <ProjectThumbnail
              src={project.image}
              alt={`${title}${t.screenshotAltSuffix}`}
              title={title}
              unavailableLabel={t.previewUnavailableLabel}
              className="h-full"
            />
          )}
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-4">
            {badges}

            <div className="space-y-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700 sm:text-2xl">
                  {title}
                </h2>
                <ProjectSubtitleNames names={project.subtitleNames} />
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                {tagline}
              </p>
            </div>

            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {description}
            </p>

            {highlights.length > 0 && (
              <ul className="space-y-2 pt-1">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            {renderTags('mt-5')}
            {renderActions(hasDetailPath, hasDemoUrl, hasGithubUrl, 'mt-5')}
          </div>
        </div>
      </article>
    );
  }

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
        <div className="mb-3">{badges}</div>

        <div className="flex-1 space-y-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
              {title}
            </h2>
            <ProjectSubtitleNames names={project.subtitleNames} />
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
            {tagline}
          </p>
        </div>

        {renderTags('mt-4')}
        {renderActions(hasDetailPath, hasDemoUrl, hasGithubUrl, 'mt-5')}
      </div>
    </article>
  );
}
