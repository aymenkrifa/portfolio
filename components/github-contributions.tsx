'use client'

import { useEffect, useState } from 'react'
import { fetchGitHubContributions } from '@/lib/github-contributions'

type GitHubContributionsProps = {
  username: string
}

type ContributionDay = {
  date: string
  count: number
  level: number
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadContributions() {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        const data = await fetchGitHubContributions(username, token)
        
        if (data) {
          const allDays = data.weeks.flatMap(week => week.contributionDays)
          setContributions(allDays)
          setTotalContributions(data.totalContributions)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Failed to load contributions:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadContributions()
  }, [username])

  const getColorClass = (level: number) => {
    // Use Tailwind classes that automatically handle light/dark mode
    const colorClasses = [
      'bg-[#EFF2F5] dark:bg-[#033A16]', // 0 - no contributions
      'bg-[#ACEEBB] dark:bg-[#0D4429]', // 1 - low
      'bg-[#4AC26B] dark:bg-[#196C2E]', // 2 - medium
      'bg-[#2DA44E] dark:bg-[#2EA043]', // 3 - high
      'bg-[#116329] dark:bg-[#56D364]', // 4 - very high
    ]
    return colorClasses[level] || colorClasses[0]
  }

  if (loading) {
    return (
      <div className="w-full overflow-hidden rounded-lg p-4">
        <div className="flex items-center justify-center h-32">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading contributions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full overflow-hidden rounded-lg p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <img
              src={`https://ghchart.rshah.org/${username}`}
              alt={`${username}'s GitHub contribution graph`}
              className="w-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Format date consistently for SSR/CSR
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  // Group contributions by week
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  // Get month labels for the timeline
  const getMonthLabels = () => {
    if (contributions.length === 0) return []
    
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1
    
    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const date = new Date(week[0].date)
        const month = date.getMonth()
        
        // Only add label if it's a new month and not the very first week
        if (month !== lastMonth && weekIndex > 0) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          labels.push({ month: months[month], weekIndex })
          lastMonth = month
        } else if (weekIndex === 0) {
          lastMonth = month
        }
      }
    })
    
    return labels
  }

  const monthLabels = getMonthLabels()

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {totalContributions.toLocaleString()}
          </span>{' '}
          contributions in the last year
        </p>
      </div>
      
      <div className="overflow-x-auto">
        {/* Month labels */}
        <div className="relative mb-3 h-4">
          <div className="inline-flex gap-[3px]">
            {weeks.map((week, weekIndex) => {
              const monthLabel = monthLabels.find(m => m.weekIndex === weekIndex)
              return (
                <div key={weekIndex} className="w-[11px] relative">
                  {monthLabel && (
                    <span className="absolute left-0 text-[10px] text-zinc-500 dark:text-zinc-400">
                      {monthLabel.month}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Contribution grid */}
        <div className="inline-flex gap-[3px] relative">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-2">
            <div className="h-[11px]"></div>
            <div className="h-[11px] flex items-center">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400 pr-1">Mon</span>
            </div>
            <div className="h-[11px]"></div>
            <div className="h-[11px] flex items-center">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400 pr-1">Wed</span>
            </div>
            <div className="h-[11px]"></div>
            <div className="h-[11px] flex items-center">
              <span className="text-[9px] text-zinc-500 dark:text-zinc-400 pr-1">Fri</span>
            </div>
            <div className="h-[11px]"></div>
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => {
                // Determine if this is near the start or end
                const isNearStart = weekIndex < 5
                const isNearEnd = weekIndex > weeks.length - 5
                const isTopRows = dayIndex <= 1
                
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`group relative h-[11px] w-[11px] rounded-sm transition-all hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-500 ${getColorClass(day.level)}`}
                    title={`${day.count} contributions on ${formatDate(day.date)}`}
                  >
                    <div className={`pointer-events-none absolute z-50 mb-2 hidden whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block dark:bg-zinc-100 dark:text-zinc-900 ${
                      isTopRows ? 'top-full mt-2' : 'bottom-full'
                    } ${
                      isNearEnd ? 'right-0' : isNearStart ? 'left-0' : 'left-1/2 -translate-x-1/2'
                    }`}>
                      {day.count} contributions on {formatDate(day.date)}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Less</span>
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-[11px] w-[11px] rounded-sm ${getColorClass(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
