import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { WEBSITE_URL } from '@/lib/constants'
import { SOCIAL_LINKS, EMAIL } from './data'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

const TITLE = 'Aymen Krifa — Machine Learning Engineer · NLP, LLM & Evaluation'
const DESCRIPTION =
  'Machine Learning Engineer building production ML systems for hotel guest communication — NLP classifiers, retrieval and RAG, multi-agent LLM orchestration, and model evaluation.'

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  alternates: {
    canonical: '/'
  },
  title: {
    default: TITLE,
    template: '%s | Aymen Krifa'
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Aymen Krifa',
    locale: 'en_US',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@krifaymen',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aymen Krifa',
  jobTitle: 'Machine Learning Engineer',
  url: WEBSITE_URL,
  email: `mailto:${EMAIL}`,
  worksFor: {
    '@type': 'Organization',
    name: 'Quinta',
    alternateName: 'Quicktext',
    url: 'https://www.quinta.im',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'École Polytechnique de Sousse',
    url: 'https://www.polytecsousse.tn',
  },
  knowsAbout: [
    'Machine Learning',
    'Natural Language Processing',
    'Text Classification',
    'Deep Learning',
    'Information Retrieval',
    'Model Evaluation',
    'Generative AI',
    'Large Language Models',
    'Multi-Agent Systems',
    'Retrieval-Augmented Generation',
    'LLM Evaluation',
    'Conversational AI',
    'Voice AI',
    'MLOps',
  ],
  sameAs: SOCIAL_LINKS.map((s) => s.link),
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
