import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

/**
 * FrontDesk — "A front desk that runs itself." A 3-card coverflow: prominent
 * teal center card with white cards peeking on both sides. Cards flow
 * RIGHT → CENTER → LEFT so each feature takes the center in turn, looping.
 *
 * Smoothness: every card is a white base with a teal layer + text/icon colors
 * that CROSSFADE (opacity/color are tween-able; gradients are not). So the
 * teal↔white change animates in sync with the slide instead of snapping.
 * Honors reduced-motion (static, no cycling).
 */
const CARDS = [
  { title: 'Per-Provider Scheduling', desc: 'View every provider side-by-side.' },
  { title: 'Recurring Appointments', desc: 'Set it once, repeat automatically.' },
  { title: 'Smart Waitlists', desc: 'Fill cancellations the moment they happen.' },
  { title: 'Automated Reminders', desc: 'Cut no-shows with timely nudges.' },
  { title: 'Effortless Check-In', desc: 'Patients check in the moment they arrive.' },
]
const N = CARDS.length
const EASE = 'cubic-bezier(0.5, 0, 0.2, 1)'
const DUR = '800ms'

// Signed slot offset: 0 = center, -1 left, +1 right, |2| = hidden.
const offsetOf = (i, active) => {
  let o = (i - active + N) % N
  if (o > N / 2) o -= N
  return o
}

export default function FrontDesk() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

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

  // Advance so the next card slides in from the RIGHT into the center (R→L flow).
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3200)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-16 pb-[32rem] md:pt-20 md:pb-[38rem] lg:pt-24"
    >
      {/* Warm transition band now comes from the shared <BandBackdrop /> behind
          this section group (see Home.jsx). Previous per-section gradient:
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46rem] md:h-[54rem]"
            style={{
              background: [
                'radial-gradient(50% 26% at 0% 13%, rgba(255,227,98,0.95), transparent 66%)',
                'radial-gradient(50% 26% at 100% 13%, rgba(255,227,98,0.95), transparent 66%)',
                'linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFEDA2 5%, #FFE067 15%, #FFCE38 26%, #FFAD1A 41%, #FB8410 56%, #C24400 77%, #2a1000 100%)',
              ].join(','),
            }}
          /> */}

      <div className="relative z-10 container-px flex flex-col items-center gap-12 md:gap-16">
        <SectionHeading
          title="A front desk that runs itself."
          lead={
            <>
              <span className="font-semibold text-ink">
                Keep providers busy and patients informed.
              </span>{' '}
              Manage multiple calendars, recurring appointments, waitlists, reminders, and check-ins
              from one centralized scheduling system.
            </>
          }
        />

        {/* Coverflow carousel */}
        <div data-reveal className="will-animate relative mx-auto w-full max-w-4xl">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl sm:aspect-[16/9]">
            {CARDS.map((card, i) => {
              const off = offsetOf(i, active)
              const abs = Math.abs(off)
              const center = off === 0
              const t = (v) => ({ transition: `${v} ${DUR} ${EASE}` })
              return (
                <article
                  key={card.title}
                  aria-hidden={!center}
                  className="absolute inset-0 overflow-hidden rounded-[24px] border-4 bg-white will-change-transform"
                  style={{
                    transform: `translateX(${off * 52}%) scale(${center ? 1 : 0.8})`,
                    opacity: center ? 1 : abs === 1 ? 0.55 : 0,
                    zIndex: 30 - abs * 10,
                    borderColor: center ? 'rgba(255,255,255,0.25)' : 'var(--color-line)',
                    boxShadow: center
                      ? '0 30px 70px rgba(0,0,0,0.22)'
                      : '0 16px 36px rgba(0,0,0,0.06)',
                    transition: `transform ${DUR} ${EASE}, opacity ${DUR} ${EASE}, box-shadow ${DUR} ${EASE}, border-color ${DUR} ${EASE}`,
                  }}
                >
                  {/* teal layer crossfades in/out */}
                  <div
                    aria-hidden="true"
                    className="bg-grad-teal absolute inset-0"
                    style={{ opacity: center ? 1 : 0, ...t('opacity') }}
                  />
                  {center && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-16 size-72 rounded-full bg-white/30 blur-3xl"
                    />
                  )}

                  <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
                    {/* icon: orange ↔ white crossfade */}
                    <div className="relative size-20 sm:size-28">
                      <div
                        className="bg-grad-orange absolute inset-0 rounded-full"
                        style={{ opacity: center ? 0 : 1, ...t('opacity') }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border-4 border-white/60 bg-gradient-to-b from-white to-[#f1f2f5]"
                        style={{ opacity: center ? 1 : 0, ...t('opacity') }}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p
                        className="font-sans text-2xl font-bold text-balance sm:text-4xl"
                        style={{ color: center ? '#ffffff' : '#020201', ...t('color') }}
                      >
                        {card.title}
                      </p>
                      <p
                        className="font-sans text-lead font-light"
                        style={{
                          color: center ? 'rgba(255,255,255,0.9)' : 'rgba(2,2,1,0.55)',
                          ...t('color'),
                        }}
                      >
                        {card.desc}
                      </p>
                      <span
                        className="mt-4 block h-px w-full"
                        style={{
                          background: center ? 'rgba(255,255,255,0.3)' : 'rgba(2,2,1,0.1)',
                          ...t('background-color'),
                        }}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div data-reveal className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
          <Button href="#ai" variant="dark">
            Explore Scheduling
          </Button>
          <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
        </div>

        {/* Vertical guide line descending through the warm transition band (Figma) */}
        <div
          aria-hidden="true"
          className="-mt-6 h-[26rem] w-px bg-gradient-to-b from-white/55 to-transparent md:h-[32rem]"
        />
      </div>
    </section>
  )
}
