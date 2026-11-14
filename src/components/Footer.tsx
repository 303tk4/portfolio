const CURRENT_YEAR = new Date().getFullYear();

interface FooterProps {
  siteName: string;
}

export function Footer({ siteName }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {CURRENT_YEAR} {siteName}. Built with Vite, React & Tailwind CSS.</p>
        <p className="font-mono text-[11px] text-slate-400">
          Update works via src/data/projects.json
        </p>
      </div>
    </footer>
  );
}
