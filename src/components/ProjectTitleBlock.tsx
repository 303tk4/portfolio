interface ProjectSubtitleNamesProps {
  names?: string[];
  className?: string;
}

/**
 * Renders fixed localized subtitle names beneath the official project title
 * with reduced size and softer contrast.
 */
export function ProjectSubtitleNames({
  names = [],
  className = 'text-xs sm:text-sm',
}: ProjectSubtitleNamesProps) {
  if (names.length === 0) {
    return null;
  }

  return (
    <div className={`mt-1 space-y-0.5 font-medium text-slate-500 ${className}`}>
      {names.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}
