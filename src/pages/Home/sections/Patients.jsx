import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Patients — "Patients who book, show up, and come back." A dark band with a
 * centered white headline + lead, then a row of three dark engagement cards
 * (Two-Way Messaging / Automated Campaigns / Patient Portal). Each card pins
 * its title + description to the bottom with a hairline divider underneath.
 */
const CARDS = [
  { title: 'Two-Way Messaging', desc: 'Communicate without phone tag.' },
  { title: 'Automated Campaigns', desc: 'Reactivation, recalls, education, and wellness.' },
  { title: 'Patient Portal', desc: 'Booking, forms, messaging, records, and payments in one place.' },
]

export default function Patients() {
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
    <section
      ref={root}
      className="pt-14 pb-8 text-white md:pt-20 md:pb-10"
      style={{
        background:
          'linear-gradient(180deg, #2a1000 0%, #1f0e06 26%, #190d07 55%, #140b07 100%)',
      }}
    >
      <div className="container-px">
        {/* Heading */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2
            data-reveal
            className="will-animate font-display text-h2 leading-[1.05] text-balance"
          >
            Patients who book, show up, and come back.
          </h2>
          <p
            data-reveal
            className="will-animate text-lead font-light text-white/75 text-pretty"
          >
            From automated reminders to self-service scheduling, KURALOGIQ helps patients stay
            engaged throughout their care journey.
          </p>
        </div>

        {/* Cards: 1 col → 3 col (md) */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-12">
          {CARDS.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="will-animate relative flex min-h-[220px] flex-col overflow-hidden rounded-[20px] border border-white/12 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] md:p-7"
              style={{
                background: 'linear-gradient(158deg, #2a2a2d 0%, #1a1a1c 58%, #131315 100%)',
              }}
            >
              {/* Diagonal light reflection from the top-right (Figma sheen) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: [
                    'radial-gradient(85% 70% at 93% -8%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0) 60%)',
                    'linear-gradient(128deg, transparent 44%, rgba(255,255,255,0.10) 56%, rgba(255,255,255,0.03) 64%, transparent 74%)',
                  ].join(','),
                }}
              />
              <div className="relative">
                <h3 className="font-sans text-2xl font-bold leading-[1.1] md:text-[1.75rem]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-base font-light text-white/65 text-pretty">{card.desc}</p>
              </div>
              <div className="relative mt-auto h-px w-full bg-white/15" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
