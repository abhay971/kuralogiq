import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Documenting — "Spend less time documenting. More time treating." Heading +
 * copy on the left; on the right a vertical deck of three green
 * provider-control cards (Figma node 461:2942 — a solid card with two faint
 * plates peeking above/below) that cycle one-by-one, with three benefit tags
 * beneath. Honors reduced motion (static stack, no cycling).
 */
const CARDS = [
  {
    title: 'Provider Approval Required',
    desc: 'Nothing becomes part of the medical record until reviewed and signed.',
  },
  {
    title: 'Every Suggestion Is Reviewable',
    desc: 'Providers edit and confirm AI drafts before anything is saved.',
  },
  {
    title: 'Signatures Stay With You',
    desc: 'AI never signs or finalizes — the provider always does.',
  },
]
const N = CARDS.length

const TAGS = ['Reduced administrative burden', 'Provider-controlled finalization', 'Faster note creation']

// Signed slot offset: 0 = centre (solid), -1 above, +1 below.
const offsetOf = (i, active) => {
  let o = (i - active + N) % N
  if (o > N / 2) o -= N
  return o
}

export default function Documenting() {
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

  // Advance the deck on a calm beat — cards flow upward, one by one.
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3400)
    return () => clearInterval(id)
  }, [reduceMotion])

  const EASE = 'cubic-bezier(0.5, 0, 0.2, 1)'

  return (
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-display leading-[1.05] text-ink text-[clamp(2.125rem,1.3rem+2.8vw,3.25rem)]">
            <span data-reveal className="block">
              Spend less time documenting. More time treating.
            </span>
          </h2>
          <p data-reveal className="max-w-xl text-lead text-pretty">
            <span className="font-semibold text-ink">
              Clinical documentation is essential. Typing it shouldn&apos;t consume your evenings.
            </span>{' '}
            <span className="font-light text-ink/70">
              KURALOGIQ helps transform structured visit information into organized documentation
              that providers can review, edit, and finalize in significantly less time.
            </span>
          </p>
        </div>

        {/* Right — cycling green deck + tags */}
        <div className="flex flex-col items-stretch gap-8">
          <div data-reveal className="will-animate relative w-full">
            <div className="relative h-[280px] sm:h-[300px]">
              {CARDS.map((card, i) => {
                const off = offsetOf(i, active)
                const center = off === 0
                return (
                  <article
                    key={card.title}
                    aria-hidden={!center}
                    className="absolute inset-x-0 top-1/2 will-change-transform"
                    style={{
                      transform: `translateY(calc(-50% + ${off * 44}px)) scale(${center ? 1 : 0.93})`,
                      opacity: center ? 1 : 0.5,
                      zIndex: center ? 30 : 10,
                      transition: `transform 700ms ${EASE}, opacity 700ms ${EASE}`,
                    }}
                  >
                    <div
                      className="relative flex min-h-[176px] items-center rounded-[26px] p-7 shadow-[0_24px_60px_rgba(19,144,105,0.28)]"
                      style={{
                        backgroundImage:
                          'linear-gradient(150deg, #2fbf86 0%, #17a074 55%, #0f8a63 100%)',
                      }}
                    >
                      {/* Content fades out as the card leaves centre, so the
                          peeking cards read as blank green plates. */}
                      <div
                        className="flex items-center gap-5 sm:gap-6"
                        style={{ opacity: center ? 1 : 0, transition: `opacity 500ms ${EASE}` }}
                      >
                        <span className="size-[84px] shrink-0 rounded-[18px] bg-gradient-to-b from-white to-[#eef1f0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]" />
                        <div className="flex min-w-0 flex-col gap-2 text-white">
                          <p className="font-sans text-2xl font-bold leading-tight md:text-[1.75rem]">
                            {card.title}
                          </p>
                          <p className="text-fluid-sm font-light text-white/85 text-pretty">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 lg:flex-nowrap">
            {TAGS.map((tag) => (
              <span
                key={tag}
                data-reveal
                className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-[0.8125rem] font-semibold text-ink shadow-[0_6px_20px_rgba(0,0,0,0.07)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
