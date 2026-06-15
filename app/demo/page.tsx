'use client'
import { GlowEffect } from '@/components/ui/glow-effect'

const COLORS = ['#10b981', '#06b6d4', '#6366f1', '#10b981']

function DemoCard({ label, duration, scale, colors, hueSpin }: { label: string; duration?: number; scale?: number; colors?: string[]; hueSpin?: boolean }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <div className="relative rounded-2xl p-[2px]">
        {hueSpin ? (
          <div className="absolute inset-0 animate-[hue-spin_4s_linear_infinite]">
            <GlowEffect colors={colors ?? COLORS} mode='rotate' blur='soft' duration={duration ?? 4} scale={scale ?? 1} />
          </div>
        ) : (
          <GlowEffect colors={colors ?? COLORS} mode='rotate' blur='soft' duration={duration ?? 4} scale={scale ?? 1} />
        )}
        <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
          <h4 className="font-normal dark:text-zinc-100">Machine Learning Engineer</h4>
          <p className="text-zinc-500 dark:text-zinc-400">Quinta (formerly Quicktext)</p>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">Full-time</span>
            <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-blue-400 text-blue-600 dark:border-blue-500 dark:text-blue-400">Main Job</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-3xl flex flex-col gap-10">

        <div>
          <h2 className="mb-4 text-base font-medium text-zinc-900 dark:text-zinc-100">colors</h2>
          <div className="flex flex-col gap-6">
            <DemoCard label='emerald → cyan → indigo (current)' duration={1} />
            <DemoCard label='emerald → cyan → indigo + hue-spin' duration={1} hueSpin />
            <DemoCard label='violet → pink → rose' duration={1} colors={['#8b5cf6', '#ec4899', '#f43f5e', '#8b5cf6']} />
            <DemoCard label='amber → orange → rose' duration={1} colors={['#f59e0b', '#f97316', '#f43f5e', '#f59e0b']} />
            <DemoCard label='cyan → blue → violet' duration={1} colors={['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4']} />
            <DemoCard label='emerald → teal → cyan' duration={1} colors={['#10b981', '#14b8a6', '#06b6d4', '#10b981']} />
            <DemoCard label='indigo → violet → purple' duration={1} colors={['#6366f1', '#8b5cf6', '#a855f7', '#6366f1']} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-medium text-zinc-900 dark:text-zinc-100">duration</h2>
          <div className="flex flex-col gap-6">
            <DemoCard label='duration={1} — very fast' duration={1} />
            <DemoCard label='duration={2} — fast' duration={2} />
            <DemoCard label='duration={4} — current' duration={4} />
            <DemoCard label='duration={8} — slow' duration={8} />
            <DemoCard label='duration={16} — very slow' duration={16} />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-medium text-zinc-900 dark:text-zinc-100">scale</h2>
          <div className="flex flex-col gap-6">
            <DemoCard label='scale={1} — current' scale={1} />
            <DemoCard label='scale={1.2}' scale={1.2} />
            <DemoCard label='scale={1.5}' scale={1.5} />
          </div>
        </div>

      </div>
    </div>
  )
}
