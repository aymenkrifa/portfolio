'use client'
import { TextLoop } from '@/components/ui/text-loop'
import { ChevronUpIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <a href="https://github.com/ibelick/nim" target="_blank">
          <TextLoop className="text-xs text-zinc-500">
            <span>© 2026 Aymen Krifa</span>
            <span>Template inspired by Nim</span>
          </TextLoop>
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
        >
          <span className="flex items-center gap-1">
            <ChevronUpIcon className="h-3 w-3" />
            Back to top
          </span>
        </button>
      </div>
    </footer>
  )
}
