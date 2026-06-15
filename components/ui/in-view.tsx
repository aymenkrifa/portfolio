'use client'
import { ReactNode, useRef, useState } from 'react'
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'motion/react'

export type InViewProps = {
  children: ReactNode
  variants?: { hidden: Variant; visible: Variant }
  transition?: Transition
  viewOptions?: UseInViewOptions
  as?: React.ElementType
  once?: boolean
  [key: string]: any
}

const defaultVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.4, ease: 'easeOut' },
  viewOptions = { once: true, margin: '0px 0px -60px 0px' },
  as = 'div',
  once,
  ...rest
}: InViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewOptions)
  const [isViewed, setIsViewed] = useState(false)
  const MotionComponent = motion[as as keyof typeof motion] as typeof as

  return (
    <MotionComponent
      ref={ref}
      initial='hidden'
      animate={(isInView || isViewed) ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      onAnimationComplete={() => { if (once) setIsViewed(true) }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}
