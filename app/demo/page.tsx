export default function DemoPage() {
  const card = (
    <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
      <h4 className="font-normal dark:text-zinc-100">Machine Learning Engineer</h4>
      <p className="text-zinc-500 dark:text-zinc-400">Quinta (formerly Quicktext)</p>
      <div className="mt-1 flex flex-wrap gap-1">
        <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">Full-time</span>
        <span className="inline-block rounded px-2 py-0.5 text-xs font-medium border border-emerald-400 text-emerald-600 dark:border-emerald-600 dark:text-emerald-400">Main Job</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <h1 className="mb-8 text-xl font-medium dark:text-white">Border Effect Demos</h1>
      <div className="mx-auto max-w-3xl flex flex-col gap-6">

        {/* 1. Rotating conic gradient */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">1. Rotating conic gradient</p>
          <div className="relative overflow-hidden rounded-2xl p-[2px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute animate-[spin-border_4s_linear_infinite]"
                style={{
                  width: '150vw', height: '150vw',
                  background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #6366f1, #f59e0b, #f43f5e, #10b981)',
                }}
              />
            </div>
            {card}
          </div>
        </div>

        {/* 2. Hue rotate */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">2. Hue rotate</p>
          <div className="relative overflow-hidden rounded-2xl p-[2px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute"
                style={{
                  width: '150vw', height: '150vw',
                  background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #6366f1, #10b981)',
                  animation: 'spin-border 6s linear infinite, hue-spin 4s linear infinite',
                }}
              />
            </div>
            {card}
          </div>
        </div>

        {/* 3. Breathing gradient */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">3. Breathing gradient</p>
          <div className="relative overflow-hidden rounded-2xl p-[2px]">
            <div
              className="absolute inset-0 animate-[breathe_3s_ease-in-out_infinite]"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4, #6366f1, #10b981)' }}
            />
            {card}
          </div>
        </div>

      </div>
    </div>
  )
}
