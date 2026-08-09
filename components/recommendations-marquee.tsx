'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { XIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { RECOMMENDATIONS } from '@/app/data'

type Recommendation = (typeof RECOMMENDATIONS)[number]

export function LinkedInMark({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

const ExternalArrow = () => (
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
    />
  </svg>
)

function RecommendationCard({
  rec,
  onOpen,
}: {
  rec: Recommendation
  onOpen: (rec: Recommendation, trigger: HTMLButtonElement) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <div className="group relative w-[300px] shrink-0 overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] transition-transform duration-200 hover:-translate-y-[3px] dark:bg-zinc-600/30">
      <Spotlight
        className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
        size={64}
      />
      <button
        ref={ref}
        type="button"
        onClick={() => ref.current && onOpen(rec, ref.current)}
        className="relative flex h-[198px] w-full cursor-pointer flex-col overflow-hidden rounded-[15px] bg-white p-4 text-left dark:bg-zinc-950"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1 select-none font-serif text-5xl leading-none text-zinc-900/[0.07] dark:text-zinc-100/[0.08]"
        >
          &rdquo;
        </span>
        {/* exactly three lines are reserved so every card is the same height,
            and the pull-quotes are short enough never to reach the limit */}
        <p className="relative h-[calc(1.55em*3)] text-sm leading-[1.55] text-zinc-900 dark:text-zinc-100">
          {rec.pull}
        </p>
        <div className="mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
              {rec.name}
            </span>
            <LinkedInMark className="h-3 w-3 shrink-0 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="mt-0.5 h-[calc(1.45em*2)] text-[11.5px] leading-[1.45] text-zinc-500 dark:text-zinc-400">
            {rec.byline}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
            Read full recommendation →
          </span>
        </div>
      </button>
    </div>
  )
}

function RecommendationDialog({
  index,
  onClose,
  onStep,
}: {
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const rec = RECOMMENDATIONS[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const pressedOnOverlay = useRef(false)

  // long recommendations start at the top when stepping between them
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    setScrolled(false)
  }, [index])

  useEffect(() => {
    dialogRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onStep(-1)
      } else if (e.key === 'ArrowRight') {
        onStep(1)
      } else if (e.key === 'Tab') {
        // keep focus inside the dialog rather than wandering onto the page
        const items = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (!items?.length) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, onStep])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-0 backdrop-blur-sm sm:items-center sm:p-5 dark:bg-black/55"
      onMouseDown={(e) => {
        pressedOnOverlay.current = e.target === e.currentTarget
      }}
      onClick={(e) => {
        // only dismiss when the press STARTED on the backdrop, so selecting
        // quote text and releasing outside does not close the dialog
        if (e.target === e.currentTarget && pressedOnOverlay.current) onClose()
        pressedOnOverlay.current = false
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recommendation-name"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.2 }}
        className="flex max-h-[88vh] w-full max-w-[580px] flex-col overflow-hidden rounded-t-[20px] bg-white shadow-2xl ring-1 ring-zinc-200/70 outline-none sm:max-h-[min(82vh,700px)] sm:rounded-[20px] dark:bg-zinc-950 dark:ring-zinc-800/70"
      >
        {/* attribution sits at the top — you should know who is speaking
            before reading five paragraphs, not after */}
        <div
          className={`flex shrink-0 items-start justify-between gap-4 border-b px-5 pb-3 pt-4 transition-colors sm:px-6 sm:pt-5 ${
            scrolled
              ? 'border-zinc-200 dark:border-zinc-800'
              : 'border-transparent'
          }`}
        >
          <div>
            <a
              id="recommendation-name"
              href={rec.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
            >
              {rec.name}
              <ExternalArrow />
            </a>
            <p className="mt-0.5 text-[12.5px] text-zinc-500 dark:text-zinc-400">
              {rec.byline}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recommendation"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-zinc-500 transition-colors hover:border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={bodyRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
          className="overflow-y-auto overscroll-contain px-5 pb-5 pt-2 sm:px-6"
        >
          {rec.quote.map((paragraph, i) => (
            <p
              key={i}
              className={`max-w-[62ch] leading-[1.7] text-zinc-900 dark:text-zinc-100 ${i > 0 ? 'mt-3.5' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50 py-3 pl-5 pr-4 sm:pl-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <a
            href="https://www.linkedin.com/in/aymenkrifa/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12.5px] text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <LinkedInMark className="h-3 w-3" />
            See all recommendations on LinkedIn
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Previous recommendation"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[46px] text-center text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {index + 1} of {RECOMMENDATIONS.length}
            </span>
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label="Next recommendation"
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** px per second the row drifts on its own */
const AUTO_SPEED = 26
/** card width + gap, used for a single arrow nudge */
const CARD_STEP = 314
/** px of movement before a press counts as a drag rather than a click */
const DRAG_THRESHOLD = 5

export function RecommendationsMarquee() {
  const visible = RECOMMENDATIONS.filter((r) => r.visible !== false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const rowRef = useRef<HTMLDivElement>(null)
  const [held, setHeld] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const dragMoved = useRef(0)
  const captured = useRef(false)
  // Sub-pixel position kept here rather than read back from scrollLeft, which
  // the browser rounds to whole pixels — accumulating 0.4px a frame directly
  // on scrollLeft rounds back to the same integer and never moves.
  const pos = useRef(0)

  // The cards are rendered twice, so passing the halfway point lands on an
  // identical frame — wrapping there makes the loop seamless in both
  // directions, however the row was moved.
  const half = () => (rowRef.current ? rowRef.current.scrollWidth / 2 : 0)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    if (held || openIndex !== null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    pos.current = row.scrollLeft
    let raf = 0
    let last = performance.now()
    const step = (now: number) => {
      const dt = Math.min(now - last, 100) // don't lurch after a background tab
      last = now
      const h = row.scrollWidth / 2
      pos.current += (dt / 1000) * AUTO_SPEED
      if (h > 0 && pos.current >= h) pos.current -= h
      row.scrollLeft = pos.current
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [held, openIndex])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return // touch scrolls natively
    dragging.current = true
    dragMoved.current = 0
    dragStartX.current = e.clientX
    dragStartScroll.current = rowRef.current?.scrollLeft ?? 0
    setHeld(true)
    // deliberately no setPointerCapture here: capturing retargets the click
    // that follows to this row, so the card's button would never receive it
    // and nothing would open. Capture is taken in onPointerMove instead,
    // once the movement is large enough to be a drag rather than a click.
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const row = rowRef.current
    if (!dragging.current || !row) return
    const dx = e.clientX - dragStartX.current
    dragMoved.current = Math.max(dragMoved.current, Math.abs(dx))

    // below the threshold this is still potentially a click — leave it alone
    if (dragMoved.current <= DRAG_THRESHOLD) return

    if (!captured.current) {
      captured.current = true
      setIsDragging(true)
      // now that it is definitely a drag, keep receiving moves even if the
      // pointer leaves the row
      row.setPointerCapture(e.pointerId)
    }

    let target = dragStartScroll.current - dx
    const h = row.scrollWidth / 2
    // re-baseline on wrap so the card stays glued to the cursor
    if (h > 0) {
      if (target >= h) {
        dragStartScroll.current -= h
        target -= h
      } else if (target < 0) {
        dragStartScroll.current += h
        target += h
      }
    }
    row.scrollLeft = target
    pos.current = target
  }

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e && rowRef.current?.hasPointerCapture(e.pointerId)) {
      rowRef.current.releasePointerCapture(e.pointerId)
    }
    dragging.current = false
    captured.current = false
    setIsDragging(false)
  }

  // trackpad, touch and the arrow buttons all move scrollLeft directly, so
  // resync the accumulator whenever it drifts from reality
  const onScroll = () => {
    const row = rowRef.current
    if (!row) return
    if (Math.abs(row.scrollLeft - pos.current) > 2) pos.current = row.scrollLeft
  }

  const nudge = (direction: number) => {
    const row = rowRef.current
    if (!row) return
    const h = half()
    // wrap first so a nudge near either edge has somewhere to go
    if (h > 0) {
      if (direction > 0 && row.scrollLeft + CARD_STEP >= h) row.scrollLeft -= h
      else if (direction < 0 && row.scrollLeft - CARD_STEP < 0) row.scrollLeft += h
      pos.current = row.scrollLeft
    }
    row.scrollBy({ left: direction * CARD_STEP, behavior: 'smooth' })
  }

  const handleOpen = useCallback(
    (rec: Recommendation, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger
      setOpenIndex(RECOMMENDATIONS.indexOf(rec))
    },
    [],
  )

  const handleClose = useCallback(() => {
    setOpenIndex(null)
    triggerRef.current?.focus()
  }, [])

  const handleStep = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current
      const length = RECOMMENDATIONS.length
      return (current + delta + length) % length
    })
  }, [])

  return (
    <>
      {/* hovering anywhere in here — row or arrows — holds the drift, so a
          smooth arrow scroll isn't fighting the animation frame */}
      <div
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => {
          endDrag()
          setHeld(false)
        }}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false)
        }}
      >
        {/* cards rendered twice so the loop can wrap seamlessly */}
        <div
          ref={rowRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onScroll={onScroll}
          onClickCapture={(e) => {
            // a drag is a scroll, not a card click — don't open the dialog
            if (dragMoved.current > DRAG_THRESHOLD) {
              e.preventDefault()
              e.stopPropagation()
            }
            dragMoved.current = 0
          }}
          className={`flex gap-3.5 overflow-x-auto py-1 [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          {[...visible, ...visible].map((rec, i) => (
            <RecommendationCard
              key={`${rec.id}-${i}`}
              rec={rec}
              onOpen={handleOpen}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll recommendations left"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll recommendations right"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <RecommendationDialog
            index={openIndex}
            onClose={handleClose}
            onStep={handleStep}
          />
        )}
      </AnimatePresence>
    </>
  )
}
