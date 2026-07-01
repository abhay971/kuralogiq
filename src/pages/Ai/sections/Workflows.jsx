import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Workflows — the blue trust band under the hero (Figma Group 64 + node
 * 461:2941 + badges 461:3043). A blue-gradient serif tagline sits on a soft
 * blue dome glow, ringed underneath by four glassy trust badges.
 */
const BADGES = [
  'Built for Healthcare',
  'Provider Controlled',
  'Specialty Aware',
  'Human Decision Making',
]

function BadgeMark() {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-grad-yellow">
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" className="size-[18px]">
        <path
          d="M9 1.5 11 6l4.5.4-3.4 3 1 4.4L9 11.6 4.9 13.8l1-4.4-3.4-3L7 6 9 1.5Z"
          fill="#1a1a1a"
        />
      </svg>
    </span>
  )
}

export default function Workflows() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="relative pt-10 pb-24 md:pt-14 md:pb-28">
      <div className="container-px flex flex-col items-center gap-12 md:gap-16">
        <h2
          data-reveal
          className="max-w-4xl text-center font-display text-h2 leading-[1.1] text-white text-balance"
        >
          See AI-assisted workflows on real patient charts and real clinical scenarios.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {BADGES.map((label) => (
            <div
              key={label}
              data-reveal
              className="flex items-center gap-3 rounded-full border border-white/20 py-2 pl-2 pr-5 shadow-[0_10px_30px_rgba(0,5,30,0.35)] backdrop-blur-md"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))',
              }}
            >
              <BadgeMark />
              <span className="font-sans text-sm font-semibold tracking-tight text-white md:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
