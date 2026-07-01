import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * BuiltForHealthcare — "AI built for healthcare. Not adapted to healthcare."
 * Heading + bold intro + regular lead on the left (Figma node 461:2930); a 2-up
 * grid of outcome pills on the right (nodes 461:3168–3177) with the first pill
 * ("Less Clicking") highlighted orange and the rest plain white, text centred.
 */
const PILLS = [
  { label: 'Less Clicking', on: true },
  { label: 'Faster Documentation' },
  { label: 'Better Visibility' },
  { label: 'Smarter Operations' },
  { label: 'More Time for Patients' },
]

export default function BuiltForHealthcare() {
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
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-display leading-[1.05] text-ink text-[clamp(2.125rem,1.3rem+2.8vw,3.25rem)]">
            <span data-reveal className="block">
              AI built for healthcare. Not adapted to healthcare.
            </span>
          </h2>
          <p data-reveal className="text-lead font-semibold text-ink">
            Many platforms add AI after the product is built.
          </p>
          <p data-reveal className="max-w-xl text-lead font-light text-ink/70 text-pretty">
            KURALOGIQ integrates AI directly into scheduling, documentation, billing, engagement, and
            reporting workflows—helping practices save time without disrupting the way they work.
          </p>
        </div>

        {/* Right — outcome pills */}
        <div className="grid grid-cols-2 gap-4">
          {PILLS.map((pill) => (
            <div
              key={pill.label}
              data-reveal
              className={cn(
                'flex items-center justify-center rounded-[20px] px-4 py-7 text-center text-lg font-bold leading-tight text-balance md:py-8 md:text-xl',
                pill.on
                  ? 'bg-grad-orange text-white shadow-[0_16px_36px_rgba(238,83,39,0.25)]'
                  : 'bg-white text-ink shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
              )}
            >
              {pill.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
