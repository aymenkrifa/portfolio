'use client'
import { useEffect, useRef, useState } from 'react'

export function EmbedIframe({ src, title, defaultHeight = 600 }: { src: string; title: string; defaultHeight?: number }) {
  const [height, setHeight] = useState(defaultHeight)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (!data || typeof data !== 'object') return

        // LinkedIn: { msgType: 'PAGE_RESIZE', height: 832 }
        if (data.msgType === 'PAGE_RESIZE' && typeof data.height === 'number') {
          setHeight(data.height)
          return
        }

        // Generic fallbacks
        const h = data.height ?? data.scrollHeight ?? data.frameHeight ?? data.size?.height
        if (typeof h === 'number' && h > 0) setHeight(h)
      } catch {}
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width="100%"
      height={height}
      frameBorder="0"
      allowFullScreen
      title={title}
      className="block"
      scrolling="yes"
    />
  )
}
