'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import ExternalLinkIndicator from '@/components/ui/ExternalLinkIndicator'
import { Info } from '@geist-ui/icons'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import ResumeSection from '@/components/resume-section'
import { GitHubContributions } from '@/components/github-contributions'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EDUCATION,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
  SKILL_CATEGORIES,
  CERTIFICATIONS,
  PROFESSIONAL_SUMMARY,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

const MONTH_MAP: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

function getPeriodMonths(period: string): number {
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

function formatMonths(months: number): string {
  if (months <= 0) return ''
  if (months < 12) return months === 1 ? '1 month' : `${months} months`
  const years = Math.floor(months / 12)
  const rem = months % 12
  const yearStr = years === 1 ? '1 year' : `${years} years`
  return rem === 0 ? yearStr : `${yearStr} ${rem} month${rem > 1 ? 's' : ''}`
}

function calculateExperienceDuration(moreInfoPeriod: string): string {
  return formatMonths(getPeriodMonths(moreInfoPeriod))
}

function getFullTimeYearsRounded(workExperience: typeof WORK_EXPERIENCE): number {
  const { fullTimeMonths } = calculateTotalExperience(workExperience)
  const years = Math.floor(fullTimeMonths / 12)
  const rem = fullTimeMonths % 12
  return rem >= 6 ? years + 1 : years
}

function calculateTotalExperience(workExperience: typeof WORK_EXPERIENCE) {
  let fullTimeMonths = 0, internshipMonths = 0, fullTimeCount = 0, internshipCount = 0
  for (const job of workExperience) {
    const months = getPeriodMonths(job.moreInfoPeriod)
    if (job.jobType === 'Full-time') { fullTimeMonths += months; fullTimeCount++ }
    else if (job.jobType === 'Internship') { internshipMonths += months; internshipCount++ }
  }
  return { fullTimeMonths, internshipMonths, fullTimeCount, internshipCount }
}

function formatTotalExperience(fullTimeMonths: number, internshipMonths: number, fullTimeCount: number, internshipCount: number): string {
  const parts = []

  if (fullTimeCount > 0 && fullTimeMonths > 0) {
    const years = Math.floor(fullTimeMonths / 12)
    const rem = fullTimeMonths % 12
    const displayYears = rem >= 6 ? years + 1 : years
    if (displayYears >= 1) {
      parts.push(`${displayYears}+ years of full-time experience`)
    } else {
      parts.push(`${fullTimeMonths} month${fullTimeMonths > 1 ? 's' : ''} of full-time experience`)
    }
  }

  if (internshipCount > 0) {
    parts.push(`${internshipCount} internship${internshipCount > 1 ? 's' : ''}`)
  }

  if (parts.length === 0) {
    const total = fullTimeCount + internshipCount
    return `${total} position${total > 1 ? 's' : ''} across different companies.`
  }

  return parts.length === 1 ? parts[0] + '.' : `${parts[0]} and ${parts[1]}.`
}

function TagBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    'Side Venture': 'border-violet-400 text-violet-600 dark:border-violet-600 dark:text-violet-400',
    'Main Job': 'border-emerald-400 text-emerald-600 dark:border-emerald-600 dark:text-emerald-400',
  }
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium border ${styles[label] ?? 'border-amber-400 text-amber-600 dark:border-amber-600 dark:text-amber-400'}`}>
      {label}
    </span>
  )
}

function JobTypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
      {type}
    </span>
  )
}

function WorkExperienceCard({ job }: { job: typeof WORK_EXPERIENCE[0] }) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 cursor-pointer w-full group hover:bg-zinc-400/30 dark:hover:bg-zinc-500/30 transition-colors duration-200">
          <Spotlight
            className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
            size={64}
          />
          <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
            <div className="relative flex w-full flex-row justify-between items-start">
              <div>
                <h4 className="font-normal dark:text-zinc-100">
                  {job.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {job.company}
                </p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 sm:hidden">
                  {job.start} - {job.end}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <JobTypeBadge type={job.jobType} />
                  {job.tags?.map((tag) => (
                    <TagBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-between self-stretch ml-2 shrink-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 hidden sm:block whitespace-nowrap">
                  {job.moreInfoPeriod}
                </p>
                <div className="flex items-center space-x-1 text-xs text-zinc-400 dark:text-zinc-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 mt-auto whitespace-nowrap">
                  <span>More details</span>
                  <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                    <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
        <MorphingDialogContent className="relative w-full max-w-2xl rounded-2xl bg-white p-8 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold dark:text-zinc-100">
                {job.title}
              </h3>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors font-medium focus:outline-none focus:ring-0"
              >
                {job.company}
                <ExternalLinkIndicator />
              </a>
              <div className="flex flex-wrap gap-1">
                <JobTypeBadge type={job.jobType} />
                {job.tags?.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {job.moreInfoPeriod} ({calculateExperienceDuration(job.moreInfoPeriod)})
              </p>
            </div>
            {job.description ? (
              <div className="space-y-3">
                <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-200">
                  Overview
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {job.description}
                  {job.cta && (
                    <>
                      {' '}
                      <a
                        href={job.cta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 transition-colors"
                      >
                        {job.cta.label}
                      </a>
                    </>
                  )}
                </p>
              </div>
            ) : job.bulletPoints && job.bulletPoints.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-200">
                  Key Responsibilities & Achievements
                </h4>
                <div className="space-y-3">
                  {job.bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0"></div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg ring-1 ring-zinc-200/50 dark:bg-zinc-900/90 dark:ring-zinc-800/50 z-10"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.3, duration: 0.2 },
            },
            exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function EducationCard({ education }: { education: typeof EDUCATION[0] }) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 cursor-pointer w-full group hover:bg-zinc-400/30 dark:hover:bg-zinc-500/30 transition-colors duration-200">
          <Spotlight
            className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
            size={64}
          />
          <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
            <div className="relative flex w-full flex-row justify-between items-start">
              <div>
                <h4 className="font-normal dark:text-zinc-100">
                  {education.degree} in {education.field}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {education.institution}
                </p>
                {education.tags && education.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {education.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} />
                    ))}
                  </div>
                )}
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 sm:hidden">
                  {education.start} - {education.end}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between self-stretch ml-2 shrink-0">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 hidden sm:block">
                  {education.start} - {education.end}
                </p>
                <div className="flex items-center space-x-1 text-xs text-zinc-400 dark:text-zinc-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 mt-auto whitespace-nowrap">
                  <span>More details</span>
                  <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                    <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
        <MorphingDialogContent className="relative w-full max-w-2xl rounded-2xl bg-white p-8 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold dark:text-zinc-100">
                {education.degree}
              </h3>
              <a
                href={education.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors font-medium focus:outline-none focus:ring-0"
              >
                {education.institution}
                <ExternalLinkIndicator className="h-3.5 w-3.5" />
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {education.field}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {education.moreInfoPeriod}
              </p>
              {education.tags && education.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {education.tags.map((tag) => (
                    <TagBadge key={tag} label={tag} />
                  ))}
                </div>
              )}
              {education.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                  {education.description}
                </p>
              )}
            </div>
            {education.achievements && education.achievements.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-200">
                  Details & Achievements
                </h4>
                <div className="space-y-3">
                  {education.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0"></div>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg ring-1 ring-zinc-200/50 dark:bg-zinc-900/90 dark:ring-zinc-800/50 z-10"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.3, duration: 0.2 },
            },
            exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  const yoe = getFullTimeYearsRounded(WORK_EXPERIENCE)
  const interpolate = (s: string) => s.replaceAll('{yoe}', String(yoe))

  return (
    <motion.main
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        id="about"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">About</h3>
        <div className="space-y-4">
          {PROFESSIONAL_SUMMARY.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-pretty text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {interpolate(paragraph)}
            </p>
          ))}
          <p className="text-zinc-600 dark:text-zinc-400">If you're building something interesting, I'm always up for a good conversation. <a
            href="#contact"
            className="group relative inline-flex items-center font-[450] text-zinc-900 transition-colors dark:text-zinc-100"
          >
            Let's talk →
            <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
          </a></p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {PROFESSIONAL_SUMMARY.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
              >
                <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500 flex-shrink-0" />
                {interpolate(item)}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Selected Projects</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Personal and open-source projects
        </p>
        <div className="flex flex-col space-y-4">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="px-1">
                <a
                  className="font-base group relative inline-flex items-center gap-2 font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                  <ExternalLinkIndicator />
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-200 px-2.5 py-1 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="experience"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Work Experience</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          {(() => {
            const { fullTimeMonths, internshipMonths, fullTimeCount, internshipCount } = calculateTotalExperience(WORK_EXPERIENCE)
            return formatTotalExperience(fullTimeMonths, internshipMonths, fullTimeCount, internshipCount)
          })()}
        </p>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <WorkExperienceCard key={job.id} job={job} />
          ))}
        </div>
      </motion.section>

      <motion.section
        id="education"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Education</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Academic background and qualifications
        </p>
        <div className="flex flex-col space-y-2">
          {EDUCATION.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 p-4 flex gap-3">
          <Info size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
          <ul className="flex flex-col gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <li className="flex gap-2"><span className="shrink-0">•</span><span>Both degrees follow the French LMD system — Licence (Bac+3, Bachelor's equivalent) and Diplôme d'Ingénieur (Bac+5, Master's equivalent).</span></li>
            <li className="flex gap-2"><span className="shrink-0">•</span><span>The engineering degree was pursued in parallel with full-time work through night classes on campus.</span></li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Skills</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Technologies and tools I work/worked with throughout the years.
        </p>
        <div className="space-y-6">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.name} className="space-y-3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-200 px-2.5 py-1 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {process.env.NEXT_PUBLIC_SHOW_GITHUB_CONTRIBUTIONS === 'true' && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <h3 className="mb-2 text-lg font-medium">GitHub Contributions</h3>
          <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
            My coding activity over the past year.
          </p>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <GitHubContributions username="aymenkrifa" />
          </div>
        </motion.section>
      )}

      <motion.section
        id="certifications"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Certifications</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Professional certifications and completed courses.
        </p>
        <div className="flex flex-col space-y-2">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30 w-full"
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {cert.name}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      Issued: {cert.date}
                    </p>
                    {cert.credentialId && (
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      View
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                      >
                        <path
                          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      {/* 
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      {/* Resume Section */}
      {process.env.NEXT_PUBLIC_SHOW_RESUME === 'true' && (
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
        >
          <ResumeSection />
        </motion.section>
      )}

      <motion.section
        id="contact"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className={process.env.NEXT_PUBLIC_SHOW_RESUME === 'true' ? '-mt-12' : ''}
      >
        <h3 className="mb-2 text-lg font-medium">Get in touch</h3>
        <div className="mb-5 space-y-1">
          {PROFESSIONAL_SUMMARY.availability.map((line, i) => (
            <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400">{line}</p>
          ))}
        </div>
        <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-500">
          Drop me a line at <a
            className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a> or find me online.
        </p>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
