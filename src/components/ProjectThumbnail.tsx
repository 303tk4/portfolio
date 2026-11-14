import { useState } from 'react';
import { Code2 } from 'lucide-react';

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ProjectThumbnail({
  src,
  alt,
  title,
  className = '',
}: ProjectThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPlaceholder = !src || failedSrc === src;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-slate-100 ${className}`}
    >
      {showPlaceholder ? (
        <div
          aria-label={`${title} プレースホルダー`}
          className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200/70 px-6 text-center"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.7) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-xs">
            <Code2 className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold tracking-tight text-slate-700">
              {title}
            </p>
            <p className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
              Preview Unavailable
            </p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
