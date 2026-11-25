import type { MouseEvent } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Film,
  Lock,
  Play,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { ProjectBadges } from '../components/ProjectBadges';
import { ProjectShowcaseGallery } from '../components/ProjectShowcaseGallery';
import { ProjectSubtitleNames } from '../components/ProjectTitleBlock';
import kimagurePageData from '../data/kimagurePage.json';
import { resolveList, resolveText, UI_TEXT } from '../i18n/translations';
import type { Locale, LocalizedString, LocalizedStringArray, Project } from '../types/project';

interface GalleryItem {
  src: string;
  label: LocalizedString;
  caption: LocalizedString;
}

interface KimagurePageConfig {
  video: {
    url: string;
    aspect: string;
    sectionTitle: LocalizedString;
    sectionSubtitle: LocalizedString;
    placeholderTitle: LocalizedString;
    placeholderDescription: LocalizedString;
    highlights: LocalizedStringArray;
  };
  gallery: {
    sectionTitle: LocalizedString;
    sectionSubtitle: LocalizedString;
    items: GalleryItem[];
  };
  apkRelease: {
    sectionTitle: LocalizedString;
    sectionSubtitle: LocalizedString;
    badgeLabel: LocalizedString;
    providerLabel: string;
    versionLabel: string;
    downloadUrl: string;
    buttonLabel: LocalizedString;
    pendingButtonLabel: LocalizedString;
    passwordNoteTitle: LocalizedString;
    passwordNoteBody: LocalizedString;
    installStepsTitle: LocalizedString;
    installSteps: LocalizedStringArray;
    configHint: LocalizedString;
  };
}

const pageConfig: KimagurePageConfig = kimagurePageData;

interface KimagureAppPageProps {
  project: Project;
  locale: Locale;
  onNavigate: (path: string) => void;
}

function isEmbedUrl(url: string): boolean {
  return (
    url.includes('youtube.com/embed') ||
    url.includes('youtube-nocookie.com/embed') ||
    url.includes('player.vimeo.com') ||
    url.includes('/preview')
  );
}

export function KimagureAppPage({
  project,
  locale,
  onNavigate,
}: KimagureAppPageProps) {
  const t = UI_TEXT[locale];
  const title = resolveText(project.title, locale);
  const tagline = resolveText(project.tagline, locale);
  const description = resolveText(project.description, locale);
  const highlights = resolveList(project.highlights, locale);

  const videoUrl = pageConfig.video.url.trim();
  const isPortraitVideo = pageConfig.video.aspect !== 'landscape';
  const videoHighlights = resolveList(pageConfig.video.highlights, locale);

  const apkUrl = pageConfig.apkRelease.downloadUrl.trim();
  const installSteps = resolveList(pageConfig.apkRelease.installSteps, locale);

  const handleBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    onNavigate('/');
  };

  return (
    <div className="space-y-12">
      {/* Breadcrumb / Back navigation */}
      <div>
        <a
          href="/"
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.backToPortfolioLabel}</span>
        </a>
      </div>

      {/* Hero overview section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
            <div className="space-y-5">
              <ProjectBadges
                status={project.status}
                featured={project.featured}
                languages={project.languages}
                locale={locale}
              />

              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {title}
                  </h2>
                  <ProjectSubtitleNames
                    names={project.subtitleNames}
                    className="mt-1.5 text-sm sm:text-base"
                  />
                </div>
                <p className="text-base font-medium leading-relaxed text-slate-700">
                  {tagline}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {description}
                </p>
              </div>

              {project.tags.length > 0 && (
                <ul
                  aria-label={t.techStackHeading}
                  className="flex flex-wrap gap-1.5"
                >
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
              <a
                href="#demo-video"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <Play className="h-4 w-4" />
                <span>{resolveText(pageConfig.video.sectionTitle, locale)}</span>
              </a>
              <a
                href="#apk-download"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <Download className="h-4 w-4" />
                <span>
                  {resolveText(pageConfig.apkRelease.buttonLabel, locale)}
                </span>
              </a>
            </div>
          </div>

          <div className="border-t border-slate-100 lg:col-span-6 lg:border-t-0 lg:border-l">
            {project.screenshots && (
              <ProjectShowcaseGallery
                screenshots={project.screenshots}
                title={title}
                altSuffix={t.screenshotAltSuffix}
              />
            )}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section
        id="demo-video"
        aria-labelledby="demo-video-heading"
        className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 uppercase">
                <Film className="h-4 w-4" />
                <span>App Walkthrough</span>
              </div>
              <h3
                id="demo-video-heading"
                className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
              >
                {resolveText(pageConfig.video.sectionTitle, locale)}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {resolveText(pageConfig.video.sectionSubtitle, locale)}
              </p>
            </div>

            {videoHighlights.length > 0 && (
              <ul className="space-y-2.5">
                {videoHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center lg:col-span-6">
            <div
              className={`w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg ${
                isPortraitVideo ? 'max-w-[290px] aspect-[9/16]' : 'aspect-video'
              }`}
            >
              {videoUrl ? (
                isEmbedUrl(videoUrl) ? (
                  <iframe
                    src={videoUrl}
                    title={resolveText(pageConfig.video.sectionTitle, locale)}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                )
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 text-center text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-inner">
                    <Play className="ml-0.5 h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold tracking-tight text-white">
                      {resolveText(pageConfig.video.placeholderTitle, locale)}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {resolveText(
                        pageConfig.video.placeholderDescription,
                        locale,
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Individual Screenshots Section */}
      <section aria-labelledby="gallery-heading" className="space-y-6">
        <div className="space-y-1">
          <h3
            id="gallery-heading"
            className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            {resolveText(pageConfig.gallery.sectionTitle, locale)}
          </h3>
          <p className="text-sm text-slate-500">
            {resolveText(pageConfig.gallery.sectionSubtitle, locale)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pageConfig.gallery.items.map((item) => {
            const label = resolveText(item.label, locale);
            const caption = resolveText(item.caption, locale);
            return (
              <figure
                key={item.src}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="flex items-center justify-center border-b border-slate-100 bg-slate-100/80 p-5">
                  <div className="w-[168px] overflow-hidden rounded-[20px] bg-slate-950 shadow-lg ring-1 ring-slate-900/20">
                    <img
                      src={item.src}
                      alt={label}
                      loading="lazy"
                      className="block h-auto w-full object-cover"
                    />
                  </div>
                </div>
                <figcaption className="flex-1 space-y-1.5 p-4">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {label}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {caption}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Highlights & Technical Architecture */}
      <section
        aria-labelledby="highlights-section-heading"
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <h3
              id="highlights-section-heading"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              {t.highlightsHeading}
            </h3>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 sm:text-base"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 lg:col-span-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <Cpu className="h-4 w-4" />
              <span>{t.techStackHeading}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-700"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pre-Play Store Monitor APK Download Section */}
      <section
        id="apk-download"
        aria-labelledby="apk-download-heading"
        className="scroll-mt-8 overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50 p-6 sm:p-8"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  <Lock className="h-3 w-3" />
                  {resolveText(pageConfig.apkRelease.badgeLabel, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  <Smartphone className="h-3 w-3 text-slate-500" />
                  {pageConfig.apkRelease.versionLabel}
                </span>
              </div>
              <h3
                id="apk-download-heading"
                className="text-xl font-bold tracking-tight text-slate-900"
              >
                {resolveText(pageConfig.apkRelease.sectionTitle, locale)}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                {resolveText(pageConfig.apkRelease.sectionSubtitle, locale)}
              </p>
            </div>

            <div className="shrink-0">
              {apkUrl ? (
                <a
                  href={apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {resolveText(pageConfig.apkRelease.buttonLabel, locale)}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-medium text-slate-500">
                  <Download className="h-4 w-4" />
                  <span>
                    {resolveText(
                      pageConfig.apkRelease.pendingButtonLabel,
                      locale,
                    )}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-slate-200/90 bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Lock className="h-4 w-4 text-indigo-600" />
                <span>
                  {resolveText(pageConfig.apkRelease.passwordNoteTitle, locale)}
                </span>
                <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-normal text-slate-600">
                  {pageConfig.apkRelease.providerLabel}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {resolveText(pageConfig.apkRelease.passwordNoteBody, locale)}
              </p>
            </div>

            <div className="space-y-2.5 rounded-xl border border-slate-200/90 bg-white p-5">
              <h4 className="text-sm font-semibold text-slate-900">
                {resolveText(pageConfig.apkRelease.installStepsTitle, locale)}
              </h4>
              <ol className="space-y-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {installSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-[11px] font-semibold text-slate-700">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {!apkUrl && (
            <p className="font-mono text-xs text-slate-500">
              {resolveText(pageConfig.apkRelease.configHint, locale)}
            </p>
          )}
        </div>
      </section>

      {/* Privacy Policy Link Section */}
      <section
        aria-label="Privacy Policy"
        className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-300 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:px-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
              プライバシーポリシー / Privacy Policy
            </h3>
            <p className="text-xs text-slate-600 sm:text-sm">
              {locale === 'en'
                ? 'Review how Kimagure Book & Podcast Player handles local audio files and Podcast requests.'
                : locale === 'zh-TW'
                  ? '查看 Kimagure Book & Podcast Player 的本機音訊與 Podcast 隱私權政策說明。'
                  : 'Kimagure Book & Podcast Player における端末内データおよび Podcast 通信の取り扱いについてご確認いただけます。'}
            </p>
          </div>
        </div>

        <a
          href="/kimagure-audiobookplayer/privacy.html"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:text-sm"
        >
          <span>プライバシーポリシー / Privacy Policy</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
