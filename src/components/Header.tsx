import { Terminal } from 'lucide-react';
import type { SiteProfile } from '../types/project';
import { GitHubIcon, XIcon } from './BrandIcons';

interface HeaderProps {
  profile: SiteProfile;
}

export function Header({ profile }: HeaderProps) {
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
                  {profile.name}
                </h1>
              </div>
            </div>
            <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
              {profile.role}
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {profile.bio}
            </p>
          </div>

          <nav
            aria-label="ソーシャルリンク"
            className="flex shrink-0 items-center gap-2.5 self-start"
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
    </header>
  );
}
