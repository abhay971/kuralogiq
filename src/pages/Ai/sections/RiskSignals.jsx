import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * RiskSignals — "See risks before they become problems." A three-card coverflow
 * (Figma nodes 461:2960 / 461:2988 / 461:2974). The orange "No-Show" spotlight is
 * ANCHORED to the centre and never moves — only its title crossfades — while two
 * plain white cards slide behind it (RIGHT → LEFT). Because only transform/opacity
 * animate, the motion stays smooth (no colour "travelling"). Honors reduced motion.
 */
const CARDS = [
  { title: 'Patient Risk Signals' },
  { title: 'No-Show Risk Indicators' },
  { title: 'Care Gap Identification' },
]
const DESC = 'Structured workflows with live narrative generation.'
const N = CARDS.length
const EASE = 'cubic-bezier(0.5, 0, 0.2, 1)'
const DUR = 720
const ORANGE = 'linear-gradient(145deg, #F5814F 0%, #EE5327 55%, #E0491F 100%)'

// Signed slot offset: 0 = centre (hidden behind the spotlight), -1 left, +1 right.
const offsetOf = (i, active) => {
  let o = (i - active + N) % N
  if (o > N / 2) o -= N
  return o
}

export default function RiskSignals() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(1) // "No-Show" centred first

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

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3400)
    return () => clearInterval(id)
  }, [reduceMotion])

  const slide = `transform ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}`
  const fade = `opacity ${DUR}ms ${EASE}`

  return (
    <section ref={root} className="overflow-x-clip py-20 md:py-28 lg:py-32">
      <div className="container-px flex flex-col gap-14 md:gap-16">
        {/* Header — serif heading + bold intro + regular lead */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <h2 data-reveal className="font-display text-h2 leading-[1.05] text-ink text-balance">
            See risks before they become problems.
          </h2>
          <p data-reveal className="max-w-xl text-lead font-semibold text-ink text-balance">
            The most valuable insight is often the one you catch early.
          </p>
          <p data-reveal className="text-lead font-light text-ink/70 text-pretty">
            KURALOGIQ helps identify patterns that may require attention, allowing teams to act
            sooner and provide better patient experiences.
          </p>
        </div>

        {/* Coverflow */}
        <div
          data-reveal
          className="will-animate relative mx-auto aspect-[73/49] w-full max-w-[560px] sm:max-w-[600px]"
        >
          {/* White cards slide behind the spotlight (transform/opacity only) */}
          {CARDS.map((card, i) => {
            const off = offsetOf(i, active)
            const abs = Math.abs(off)
            return (
              <article
                key={card.title}
                aria-hidden
                className="absolute inset-0 rounded-[28px] bg-white will-change-transform"
                style={{
                  transform: `translateX(${off * 58}%) scale(${off === 0 ? 1 : 0.74})`,
                  opacity: abs <= 1 ? 1 : 0,
                  zIndex: 10 - abs,
                  boxShadow: '0 24px 55px rgba(0,0,0,0.10)',
                  transition: slide,
                }}
              >
                <div className="absolute inset-[9px] overflow-hidden rounded-[20px]">
                  <div className="relative flex h-full flex-col justify-end p-7 sm:p-9">
                    <p className="font-sans text-2xl font-bold leading-tight text-ink text-balance sm:text-[1.9rem]">
                      {card.title}
                    </p>
                    <p className="mt-2 text-fluid-sm font-light text-ink/55">{DESC}</p>
                    <span className="mt-6 block h-px w-full bg-ink/12" />
                  </div>
                </div>
              </article>
            )
          })}

          {/* Fixed orange spotlight — never moves; only its title crossfades */}
          <div
            className="absolute inset-0 z-30 rounded-[28px] bg-white"
            style={{ boxShadow: '0 44px 90px rgba(238,83,39,0.30)' }}
          >
            <div
              className="absolute inset-[9px] overflow-hidden rounded-[20px]"
              style={{ backgroundImage: ORANGE }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(55% 55% at 80% 22%, rgba(255,255,255,0.38), transparent 62%)',
                }}
              />
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  aria-hidden={i !== active}
                  className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9"
                  style={{ opacity: i === active ? 1 : 0, transition: fade }}
                >
                  <p className="font-sans text-2xl font-bold leading-tight text-white text-balance sm:text-[1.9rem]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-fluid-sm font-light text-white/90">{DESC}</p>
                  <span className="mt-6 block h-px w-full bg-white/45" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
