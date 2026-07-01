import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * AppointmentPrepared — "Walk into every appointment prepared." A bold intro +
 * regular lead over four insight cards (Figma nodes 461:3079–3094). Each card
 * pairs a lightweight green SVG data-viz (with baseline axis + dot markers, per
 * the Figma) with a serif title and one-line description.
 */
const AXIS = 'rgba(2,2,1,0.10)'
const LINE = '#1B7D53' // Figma forest green
const DOT = '#15613D'
const ORANGE = '#E8551F'

// 1 — Smart Chart Summaries: green area line with a dot marker
function AreaChart() {
  const d =
    'M8 128 C42 128 60 126 82 121 C112 114 122 80 158 80 C196 80 206 106 240 104 C272 102 290 74 316 72 C346 70 360 92 386 90 C430 86 470 42 512 30'
  return (
    <svg viewBox="0 0 520 200" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ap-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#35C08F" stopOpacity="0.34" />
          <stop offset="1" stopColor="#35C08F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L512 175 L8 175 Z`} fill="url(#ap-area)" />
      <path d={d} fill="none" stroke={LINE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="175" x2="512" y2="175" stroke={AXIS} strokeWidth="2" />
      <circle cx="316" cy="72" r="9" fill={DOT} stroke="#fff" strokeWidth="3" />
    </svg>
  )
}

// 2 — Recent Visit Highlights: chunky bars, one highlighted green bar + dot
function BarChart() {
  const BASE = 180
  const W = 54
  const bars = [
    { x: 40, h: 90, on: false },
    { x: 138, h: 64, on: false },
    { x: 236, h: 152, on: true },
    { x: 334, h: 104, on: false },
    { x: 432, h: 78, on: false },
  ]
  return (
    <svg viewBox="0 0 520 210" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ap-bar-on" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3FBF8E" />
          <stop offset="1" stopColor="#C6EDD9" />
        </linearGradient>
        <linearGradient id="ap-bar-off" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4E4E4" />
          <stop offset="1" stopColor="#F2F2F2" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={BASE - b.h}
          width={W}
          height={b.h}
          rx="16"
          fill={b.on ? 'url(#ap-bar-on)' : 'url(#ap-bar-off)'}
        />
      ))}
      <line x1="24" y1={BASE} x2="496" y2={BASE} stroke={AXIS} strokeWidth="2" />
      <circle cx={236 + W / 2} cy={BASE - 152} r="11" fill={DOT} stroke="#fff" strokeWidth="4" />
    </svg>
  )
}

// 3 — Outcome Tracking Insights: a rising green line crossing a falling orange one
function TrendLines() {
  return (
    <svg viewBox="0 0 520 200" className="w-full" aria-hidden="true">
      {/* green — starts low, ends high */}
      <path
        d="M8 132 C64 132 92 104 150 104 C208 104 236 140 300 128 C360 116 384 66 430 62 C470 58 492 78 512 58"
        fill="none"
        stroke={LINE}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* orange — starts high, ends low */}
      <path
        d="M8 92 C64 92 92 66 150 70 C208 74 236 118 300 116 C360 114 384 150 430 150 C470 150 492 132 512 146"
        fill="none"
        stroke={ORANGE}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8" y1="178" x2="512" y2="178" stroke={AXIS} strokeWidth="2" />
    </svg>
  )
}

// 4 — Open Action Items: three glossy filled nodes on a thick connecting bar
function StatusNodes() {
  const cx = [96, 260, 424]
  const cy = 100
  const r = 44
  return (
    <svg viewBox="0 0 520 200" className="w-full" aria-hidden="true">
      <defs>
        <radialGradient id="ap-node-green" cx="0.35" cy="0.28" r="0.95">
          <stop offset="0" stopColor="#4EC492" />
          <stop offset="0.55" stopColor="#259A6C" />
          <stop offset="1" stopColor="#127A54" />
        </radialGradient>
        <radialGradient id="ap-node-grey" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FAFAFA" />
          <stop offset="1" stopColor="#D7D7D7" />
        </radialGradient>
        <filter id="ap-node-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b3a28" floodOpacity="0.18" />
        </filter>
      </defs>
      {/* connecting bar: solid green, then a lighter green to the pending node */}
      <line x1={cx[0]} y1={cy} x2={cx[1]} y2={cy} stroke={LINE} strokeWidth="14" strokeLinecap="round" />
      <line x1={cx[1]} y1={cy} x2={cx[2]} y2={cy} stroke="#9FE0C4" strokeWidth="14" strokeLinecap="round" />
      <g filter="url(#ap-node-shadow)">
        <circle cx={cx[0]} cy={cy} r={r} fill="url(#ap-node-green)" />
        <circle cx={cx[1]} cy={cy} r={r} fill="url(#ap-node-green)" />
        <circle cx={cx[2]} cy={cy} r={r} fill="url(#ap-node-grey)" />
      </g>
    </svg>
  )
}

const CARDS = [
  { title: 'Smart Chart Summaries', desc: 'Instant patient overviews.', Chart: AreaChart },
  { title: 'Recent Visit Highlights', desc: 'Review key interactions quickly.', Chart: BarChart },
  { title: 'Outcome Tracking Insights', desc: 'Identify important trends faster.', Chart: TrendLines },
  { title: 'Open Action Items', desc: 'See what still requires attention.', Chart: StatusNodes },
]

export default function AppointmentPrepared() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 48,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="pt-6 pb-20 md:pt-10 md:pb-28 lg:pt-12 lg:pb-32">
      <div className="container-px flex flex-col gap-14 md:gap-16">
        {/* Header — serif heading + bold intro + regular lead */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 data-reveal className="font-display text-h2 leading-[1.05] text-ink text-balance">
            Walk into every appointment prepared.
          </h2>
          <p data-reveal className="max-w-md text-lead font-semibold text-ink text-balance">
            Patient charts grow quickly. Important details shouldn&apos;t get buried.
          </p>
          <p data-reveal className="text-lead font-light text-ink/70 text-pretty">
            KURALOGIQ uses AI-assisted summaries to help providers quickly understand patient
            history, recent visits, outcomes, and outstanding items before the appointment begins.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="will-animate flex flex-col overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-[0_16px_36px_rgba(0,0,0,0.06)] md:p-8"
            >
              <div className="flex flex-1 items-end">
                <card.Chart />
              </div>
              <div className="mt-8 flex flex-col gap-1">
                <h3 className="font-display text-2xl leading-tight text-ink">{card.title}</h3>
                <p className="text-fluid-sm font-light text-ink/60">{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
