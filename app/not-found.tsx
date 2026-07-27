import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center pb-20">
      <p className="font-mono text-sm text-zinc-400 dark:text-zinc-500">404</p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
        Page not found
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        This page doesn&apos;t exist — or it moved somewhere quieter.
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="group relative inline-flex items-center font-[450] text-zinc-900 transition-colors dark:text-zinc-100"
        >
          Back home →
          <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
        </Link>
      </p>
    </main>
  )
}
