import { UI_TEXT } from '../i18n/translations';
import type { Locale } from '../types/project';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  totalCount: number;
  tagCounts: Record<string, number>;
  locale: Locale;
  onSelectTag: (tag: string) => void;
}

export function TagFilter({
  tags,
  selectedTag,
  totalCount,
  tagCounts,
  locale,
  onSelectTag,
}: TagFilterProps) {
  const t = UI_TEXT[locale];
  const filterOptions = ['All', ...tags];

  return (
    <div
      role="group"
      aria-label={t.filterGroupLabel}
      className="flex flex-wrap items-center gap-2"
    >
      {filterOptions.map((tag) => {
        const isActive = selectedTag === tag;
        const count = tag === 'All' ? totalCount : (tagCounts[tag] ?? 0);
        const label = tag === 'All' ? t.allTagLabel : tag;

        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectTag(tag)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
              isActive
                ? 'bg-slate-900 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>{label}</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none tabular-nums ${
                isActive
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
