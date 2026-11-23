import type { ProjectScreenshots } from '../types/project';

interface ProjectShowcaseGalleryProps {
  screenshots: ProjectScreenshots;
  title: string;
  altSuffix: string;
  compact?: boolean;
}

/**
 * Renders a layered 4-screen showcase with the primary screenshot centered in front
 * and three supporting screenshots fanned underneath/behind it.
 */
export function ProjectShowcaseGallery({
  screenshots,
  title,
  altSuffix,
  compact = false,
}: ProjectShowcaseGalleryProps) {
  const [leftOuter, leftInner, rightSide] = screenshots.secondary;

  const containerHeight = compact
    ? 'h-[310px] sm:h-[370px]'
    : 'h-[340px] sm:h-[415px] lg:h-[460px]';

  const mainSize = compact
    ? 'w-[122px] sm:w-[148px] top-4 sm:top-5'
    : 'w-[126px] sm:w-[162px] lg:w-[180px] top-4 sm:top-5 lg:top-6';

  const secondarySize = compact
    ? 'w-[100px] sm:w-[122px]'
    : 'w-[102px] sm:w-[134px] lg:w-[150px]';

  const leftOuterPos = compact
    ? 'left-1/2 -translate-x-[calc(50%+104px)] sm:-translate-x-[calc(50%+134px)] top-12 sm:top-14'
    : 'left-1/2 -translate-x-[calc(50%+106px)] sm:-translate-x-[calc(50%+144px)] lg:-translate-x-[calc(50%+172px)] top-12 sm:top-14 lg:top-16';

  const leftInnerPos = compact
    ? 'left-1/2 -translate-x-[calc(50%+56px)] sm:-translate-x-[calc(50%+74px)] top-9 sm:top-10'
    : 'left-1/2 -translate-x-[calc(50%+58px)] sm:-translate-x-[calc(50%+82px)] lg:-translate-x-[calc(50%+98px)] top-9 sm:top-11 lg:top-12';

  const rightPos = compact
    ? 'left-1/2 -translate-x-[calc(50%-78px)] sm:-translate-x-[calc(50%-102px)] top-10 sm:top-12'
    : 'left-1/2 -translate-x-[calc(50%-80px)] sm:-translate-x-[calc(50%-110px)] lg:-translate-x-[calc(50%-126px)] top-10 sm:top-12 lg:top-14';

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/80 ${containerHeight}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.6) 1px, transparent 0)',
        backgroundSize: '18px 18px',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_68%)]"
      />

      {leftOuter && (
        <div
          className={`absolute z-10 -rotate-6 overflow-hidden rounded-2xl bg-slate-950 shadow-lg ring-1 ring-slate-900/20 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-8 ${secondarySize} ${leftOuterPos}`}
        >
          <img
            src={leftOuter}
            alt={`${title}${altSuffix} 2`}
            className="block h-auto w-full object-cover"
          />
        </div>
      )}

      {leftInner && (
        <div
          className={`absolute z-20 -rotate-3 overflow-hidden rounded-2xl bg-slate-950 shadow-xl ring-1 ring-slate-900/20 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-4 ${secondarySize} ${leftInnerPos}`}
        >
          <img
            src={leftInner}
            alt={`${title}${altSuffix} 3`}
            className="block h-auto w-full object-cover"
          />
        </div>
      )}

      {rightSide && (
        <div
          className={`absolute z-20 rotate-5 overflow-hidden rounded-2xl bg-slate-950 shadow-xl ring-1 ring-slate-900/20 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-6 ${secondarySize} ${rightPos}`}
        >
          <img
            src={rightSide}
            alt={`${title}${altSuffix} 4`}
            className="block h-auto w-full object-cover"
          />
        </div>
      )}

      <div
        className={`absolute left-1/2 z-30 -translate-x-1/2 overflow-hidden rounded-[20px] bg-slate-950 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.45)] ring-2 ring-slate-900/25 transition-transform duration-300 ease-out group-hover:scale-[1.02] ${mainSize}`}
      >
        <img
          src={screenshots.main}
          alt={`${title}${altSuffix}`}
          className="block h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
