const MONTH_MAP: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

export function getPeriodMonths(period: string): number {
  const lower = period.toLowerCase()
  if (lower.includes('present')) {
    const m = period.match(/(\w+)\s+(\d{4})\s*-\s*present/i)
    if (!m) return 0
    const start = new Date(parseInt(m[2]), MONTH_MAP[m[1].toLowerCase()] ?? 0)
    const now = new Date()
    return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  }
  const m = period.match(/(\w+)\s+(\d{4})\s*-\s*(\w+)\s+(\d{4})/i)
  if (!m) return 0
  const start = new Date(parseInt(m[2]), MONTH_MAP[m[1].toLowerCase()] ?? 0)
  const end = new Date(parseInt(m[4]), MONTH_MAP[m[3].toLowerCase()] ?? 0)
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
}

export function formatMonths(months: number): string {
  if (months <= 0) return ''
  if (months < 12) return months === 1 ? '1 month' : `${months} months`
  const years = Math.floor(months / 12)
  const rem = months % 12
  const yearStr = years === 1 ? '1 year' : `${years} years`
  return rem === 0 ? yearStr : `${yearStr} ${rem} month${rem > 1 ? 's' : ''}`
}

export function calculateExperienceDuration(moreInfoPeriod: string): string {
  return formatMonths(getPeriodMonths(moreInfoPeriod))
}
