'use client'
import { TextEffect } from '@/components/ui/text-effect'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-start justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Aymen Krifa
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Machine Learning Engineer
        </TextEffect>
      </div>
      <ThemeSwitch />
    </header>
  )
}
