'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
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
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EDUCATION,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
  SKILL_CATEGORIES,
  CERTIFICATIONS,
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

// Function to calculate experience duration from period string
function calculateExperienceDuration(moreInfoPeriod: string): string {
  const periodLower = moreInfoPeriod.toLowerCase()

  // Handle "present" case
  if (periodLower.includes('present')) {
    const startMatch = moreInfoPeriod.match(/(\w+)\s+(\d{4})\s*-\s*present/i)
    if (startMatch) {
      const startMonth = startMatch[1]
      const startYear = parseInt(startMatch[2])

      const monthMap: { [key: string]: number } = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
      }

      const startDate = new Date(startYear, monthMap[startMonth.toLowerCase()] || 0)
      const currentDate = new Date()

      const diffInMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth())

      if (diffInMonths >= 12) {
        const years = Math.floor(diffInMonths / 12)
        const months = diffInMonths % 12
        if (months === 0) {
          return years === 1 ? '1 year' : `${years} years`
        } else {
          return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
        }
      } else {
        return diffInMonths === 1 ? '1 month' : `${diffInMonths} months`
      }
    }
  } else {
    // Handle date range cases
    const rangeMatch = moreInfoPeriod.match(/(\w+)\s+(\d{4})\s*-\s*(\w+)\s+(\d{4})/i)
    if (rangeMatch) {
      const startMonth = rangeMatch[1]
      const startYear = parseInt(rangeMatch[2])
      const endMonth = rangeMatch[3]
      const endYear = parseInt(rangeMatch[4])

      const monthMap: { [key: string]: number } = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
      }

      const startDate = new Date(startYear, monthMap[startMonth.toLowerCase()] || 0)
      const endDate = new Date(endYear, monthMap[endMonth.toLowerCase()] || 0)

      const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) + 1 // +1 to include both start and end month

      if (diffInMonths >= 12) {
        const years = Math.floor(diffInMonths / 12)
        const months = diffInMonths % 12
        if (months === 0) {
          return years === 1 ? '1 year' : `${years} years`
        } else {
          return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
        }
      } else {
        return diffInMonths === 1 ? '1 month' : `${diffInMonths} months`
      }
    }
  }

  return ''
}

// Function to calculate total work experience by job type
function calculateTotalExperience(workExperience: typeof WORK_EXPERIENCE): { fullTimeMonths: number, internshipMonths: number, fullTimeCount: number, internshipCount: number } {
  let fullTimeMonths = 0
  let internshipMonths = 0
  let fullTimeCount = 0
  let internshipCount = 0

  workExperience.forEach(job => {
    const periodLower = job.moreInfoPeriod.toLowerCase()
    let jobMonths = 0

    // Handle "present" case
    if (periodLower.includes('present')) {
      const startMatch = job.moreInfoPeriod.match(/(\w+)\s+(\d{4})\s*-\s*present/i)
      if (startMatch) {
        const startMonth = startMatch[1]
        const startYear = parseInt(startMatch[2])

        const monthMap: { [key: string]: number } = {
          'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
          'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
        }

        const startDate = new Date(startYear, monthMap[startMonth.toLowerCase()] || 0)
        const currentDate = new Date()

        jobMonths = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
          (currentDate.getMonth() - startDate.getMonth())
      }
    } else {
      // Handle date range cases
      const rangeMatch = job.moreInfoPeriod.match(/(\w+)\s+(\d{4})\s*-\s*(\w+)\s+(\d{4})/i)
      if (rangeMatch) {
        const startMonth = rangeMatch[1]
        const startYear = parseInt(rangeMatch[2])
        const endMonth = rangeMatch[3]
        const endYear = parseInt(rangeMatch[4])

        const monthMap: { [key: string]: number } = {
          'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
          'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
        }

        const startDate = new Date(startYear, monthMap[startMonth.toLowerCase()] || 0)
        const endDate = new Date(endYear, monthMap[endMonth.toLowerCase()] || 0)

        jobMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth()) + 1 // +1 to include both start and end month
      }
    }

    // Categorize by job type
    if (job.jobType === 'Full-time') {
      fullTimeMonths += jobMonths
      fullTimeCount++
    } else if (job.jobType === 'Internship') {
      internshipMonths += jobMonths
      internshipCount++
    }
  })

  return {
    fullTimeMonths,
    internshipMonths,
    fullTimeCount,
    internshipCount
  }
}

function formatTotalExperience(fullTimeMonths: number, internshipMonths: number, fullTimeCount: number, internshipCount: number): string {
  const parts = []

  // Full-time experience
  if (fullTimeCount > 0 && fullTimeMonths > 0) {
    const years = Math.floor(fullTimeMonths / 12)
    const remainingMonths = fullTimeMonths % 12

    if (years >= 3) {
      parts.push(`${years}+ years of full-time experience`)
    } else if (years >= 1) {
      if (remainingMonths > 0) {
        parts.push(`${years}+ years of full-time experience`)
      } else {
        parts.push(`${years} year${years > 1 ? 's' : ''} of full-time experience`)
      }
    } else {
      parts.push(`${fullTimeMonths} months of full-time experience`)
    }
  }

  // Internship experience
  if (internshipCount > 0) {
    parts.push(`${internshipCount} internship${internshipCount > 1 ? 's' : ''}`)
  }

  // Fallback to show total positions if no specific categories
  if (parts.length === 0) {
    const totalPositions = fullTimeCount + internshipCount
    return `${totalPositions} position${totalPositions > 1 ? 's' : ''} across different companies.`
  }

  // Format as a proper sentence
  if (parts.length === 1) {
    return parts[0] + '.'
  } else if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}.`
  }

  return parts.join(', ') + '.'
}

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
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
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  {job.jobType}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-zinc-600 dark:text-zinc-400">
                  {job.start} - {job.end}
                </p>
                <div className="flex items-center space-x-1 text-xs text-zinc-400 dark:text-zinc-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  <span>Click for details</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {job.jobType}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {job.moreInfoPeriod} ({calculateExperienceDuration(job.moreInfoPeriod)})
              </p>
            </div>
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
                  {education.degree}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {education.institution}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  {education.field}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <p className="text-zinc-600 dark:text-zinc-400">
                  {education.start} - {education.end}
                </p>
                <div className="flex items-center space-x-1 text-xs text-zinc-400 dark:text-zinc-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  <span>Click for details</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {education.field}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {education.moreInfoPeriod}
              </p>
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
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <div className="text-zinc-600 dark:text-zinc-400">
            <p>Bridging research and real-world impact through AI — from fine-tuning LLMs to deploying scalable, production-ready pipelines.</p>
            <p>In summary, I turn data into tools that work, learn, and deliver real value. 🎯</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Selected Projects</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Personal and open-source projects
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              {/* <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div> */}
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
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
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0">
              <Info size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Final degree was pursued in parallel with full-time work through night classes on campus.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Skills</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Technologies and tools I work with regularly.
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
                    className="rounded-lg bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Certifications</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Professional certifications and completed courses.
        </p>
        <div className="space-y-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
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
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <ResumeSection />
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-2 text-lg font-medium">Let's Connect</h3>
        <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">
          Feel free to reach out via email or connect on social platforms
        </p>
        
        <div className="space-y-4">
          {/* Email */}
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Email: <a
                className="text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((link) => (
              <MagneticSocialLink key={link.label} link={link.link}>
                {link.label}
              </MagneticSocialLink>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.main>
  )
}
