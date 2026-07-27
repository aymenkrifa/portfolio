const TAG_STYLES: Record<string, string> = {
  'Side Venture': 'border-violet-400 text-violet-600 dark:bg-violet-950/40 dark:border-violet-700/60 dark:text-violet-300',
  'Main Job': 'border-blue-400 text-blue-600 dark:bg-blue-950/40 dark:border-blue-700/60 dark:text-blue-300',
  'EUR-ACE® Accredited': 'border-blue-400 text-blue-600 dark:bg-blue-950/40 dark:border-blue-700/60 dark:text-blue-300',
  "Bachelor's Equivalent": 'border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400',
}

export function TagBadge({ label }: { label: string }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium border ${TAG_STYLES[label] ?? 'border-amber-400 text-amber-600 dark:border-amber-600 dark:text-amber-400'}`}>
      {label.split('®').map((part, i, arr) => (
        <span key={i}>{part}{i < arr.length - 1 && <sup>®</sup>}</span>
      ))}
    </span>
  )
}

export function JobTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
      {type}
    </span>
  )
}
