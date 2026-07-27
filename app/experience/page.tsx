import type { Metadata } from 'next'
import Link from 'next/link'
import ExternalLinkIndicator from '@/components/ui/ExternalLinkIndicator'
import { TagBadge, JobTypeBadge } from '@/components/badges'
import { calculateExperienceDuration } from '@/lib/duration'
import { WORK_EXPERIENCE, EDUCATION } from '../data'

const TITLE = 'Experience'
const DESCRIPTION =
  'The full detail behind every role: BERT intent classification, RAG and embedding retrieval, LangGraph multi-agent orchestration, LLM-as-a-Judge evaluation, and voice AI at Quinta.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/experience' },
  openGraph: {
    type: 'profile',
    url: '/experience',
    title: `${TITLE} | Aymen Krifa`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} | Aymen Krifa`,
    description: DESCRIPTION,
  },
}

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-1.5 font-[450] text-zinc-900 transition-colors dark:text-zinc-100"
    >
      {children}
      <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
    </a>
  )
}

export default function ExperiencePage() {
  const showSkinify = process.env.NEXT_PUBLIC_SHOW_SKINIFY === 'true'
  const roles = WORK_EXPERIENCE.filter(
    (job) => job.visible !== false && (showSkinify || job.id !== 'work_skinify'),
  )
  const education = EDUCATION.filter((e) => e.visible !== false)

  return (
    <main className="pb-8">
      <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
        Experience
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        The long version — every role, the systems I built in it, and the numbers
        behind them.
      </p>
      <p className="mt-4 text-sm">
        <Link
          href="/"
          className="group relative inline-flex items-center text-zinc-900 transition-colors dark:text-zinc-100"
        >
          ← Back to the home page
          <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
        </Link>
      </p>

      <section className="mt-12">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Work</h2>
        <div className="mt-6 space-y-10">
          {roles.map((job) => (
            <article
              key={job.id}
              id={job.id}
              className="scroll-mt-8 border-t border-zinc-100 pt-8 first:border-t-0 first:pt-0 dark:border-zinc-800"
            >
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                {job.title}
              </h3>
              <p className="mt-0.5">
                <SectionLink href={job.link}>
                  {job.company}
                  <ExternalLinkIndicator className="h-3 w-3" />
                </SectionLink>
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                {job.moreInfoPeriod} ({calculateExperienceDuration(job.moreInfoPeriod)})
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <JobTypeBadge type={job.jobType} />
                {job.tags?.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
              {job.description && (
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {job.description}
                </p>
              )}
              {job.bulletPoints && job.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {job.bulletPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {job.media && job.media.some((m) => m.visible) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.media
                    .filter((m) => m.visible)
                    .map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                      >
                        {item.label}
                        <ExternalLinkIndicator className="h-3 w-3" />
                      </a>
                    ))}
                </div>
              )}
              {job.cta && (
                <p className="mt-4 text-sm">
                  <SectionLink href={job.cta.url}>{job.cta.label}</SectionLink>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Education</h2>
        <div className="mt-6 space-y-10">
          {education.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="scroll-mt-8 border-t border-zinc-100 pt-8 first:border-t-0 first:pt-0 dark:border-zinc-800"
            >
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                {entry.degree} in {entry.field}
              </h3>
              <p className="mt-0.5">
                <SectionLink href={entry.link}>
                  {entry.institution}
                  <ExternalLinkIndicator className="h-3 w-3" />
                </SectionLink>
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                {entry.moreInfoPeriod}
              </p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {entry.tags.map((tag) => (
                    <TagBadge key={tag} label={tag} />
                  ))}
                </div>
              )}
              {entry.description && (
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {entry.description}
                </p>
              )}
              {entry.achievements && entry.achievements.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement.text} className="flex items-start gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                      <span className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {achievement.text.split('®').map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <sup>®</sup>}
                          </span>
                        ))}
                        {achievement.link && (
                          <>
                            {' '}
                            <SectionLink href={achievement.link}>
                              {achievement.linkLabel ?? 'View →'}
                            </SectionLink>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <p className="mt-14 text-sm text-zinc-600 dark:text-zinc-400">
        Skills, projects, and contact details live on the{' '}
        <Link
          href="/"
          className="group relative inline-flex items-center text-zinc-900 transition-colors dark:text-zinc-100"
        >
          home page
          <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
        </Link>
        .
      </p>
    </main>
  )
}
