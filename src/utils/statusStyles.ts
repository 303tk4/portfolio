export interface StatusStyle {
  badge: string;
  dot: string;
}

const STATUS_STYLE_MAP: Record<string, StatusStyle> = {
  Live: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  'In Development': {
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-500',
  },
  Beta: {
    badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
    dot: 'bg-sky-500',
  },
  Archived: {
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    dot: 'bg-slate-400',
  },
};

const DEFAULT_STATUS_STYLE: StatusStyle = {
  badge: 'bg-slate-100 text-slate-700 border-slate-200',
  dot: 'bg-slate-500',
};

/**
 * Returns Tailwind classes for a given project status string.
 */
export function getStatusStyle(status: string): StatusStyle {
  return STATUS_STYLE_MAP[status] ?? DEFAULT_STATUS_STYLE;
}
