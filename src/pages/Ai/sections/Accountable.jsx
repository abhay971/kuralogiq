import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Accountable — the transparency block (Figma nodes 461:3111 / 461:3116 /
 * 461:3115 / 461:3148 / 461:3158). Two stacked headings, a hairline divider, an
 * "Our Commitments" label, then two column-major lists of commitments, each led
 * by a green pill marker.
 */
const COLUMNS = [
  [
    'AI output is always reviewable before entering the patient record.',
    'Providers remain responsible for clinical decisions.',
    'AI never signs, finalizes, or approves documentation.',
  ],
  [
    'AI features are clearly identified throughout the platform.',
    'Human oversight remains part of every workflow.',
    'Patient information remains protected under the same security architecture used across KURALOGIQ.',
  ],
]

function Pill() {
  return (
    <span className="relative h-7 w-[52px] shrink-0 md:h-8 md:w-[60px]">
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#a9e2c9]/55" />
      <span
        aria-hidden="true"
        className="absolute inset-[4px] rounded-full shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.45)]"
        style={{ backgroundImage: 'linear-gradient(180deg, #45C692 0%, #159A63 100%)' }}
      />
    </span>
  )
}

export default function Accountable() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 40,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px flex flex-col items-center">
        {/* Two stacked headings */}
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 data-reveal className="font-display text-h2 leading-[1.1] text-ink text-balance">
            How we keep AI accountable.
          </h2>
          <p data-reveal className="text-lead font-light text-ink/70 text-pretty">
            Healthcare demands transparency.
            <br />
            That&apos;s why every AI capability inside KURALOGIQ follows a simple principle:
          </p>
        </div>

        <h3
          data-reveal
          className="mt-8 max-w-4xl text-center font-display text-hero leading-[1.05] text-ink text-balance"
        >
          AI assists. Providers decide.
        </h3>

        {/* Divider + label */}
        <div data-reveal className="mt-14 flex w-full max-w-5xl items-center gap-5 md:mt-16">
          <span className="h-px flex-1 bg-ink/12" />
          <span className="font-display text-lg text-ink/70">Our Commitments</span>
          <span className="h-px flex-1 bg-ink/12" />
        </div>

        {/* Commitment columns (column-major: left = 1-3, right = 4-6) */}
        <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2 md:gap-y-8">
          {COLUMNS.map((col, c) => (
            <div key={c} className="flex flex-col gap-7 md:gap-8">
              {col.map((item) => (
                <div key={item} data-reveal className="flex items-start gap-4">
                  <Pill />
                  <p className="text-base font-light text-ink/90 text-pretty md:text-[1.0625rem]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
