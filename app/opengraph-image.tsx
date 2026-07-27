import { ImageResponse } from 'next/og'

export const alt =
  'Aymen Krifa — Machine Learning Engineer · LLM agents, RAG & evaluation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 100px',
          backgroundColor: '#09090b',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: '#fafafa',
            letterSpacing: '-0.03em',
          }}
        >
          Aymen Krifa
        </div>
        <div style={{ fontSize: 38, color: '#a1a1aa', marginTop: 18 }}>
          Machine Learning Engineer
        </div>
        <div style={{ fontSize: 28, color: '#71717a', marginTop: 14 }}>
          LLM agents · RAG · Evaluation
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 56,
          }}
        >
          <div
            style={{
              width: 52,
              height: 2,
              backgroundColor: '#3f3f46',
            }}
          />
          <div style={{ fontSize: 26, color: '#52525b' }}>aymenkrifa.com</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
