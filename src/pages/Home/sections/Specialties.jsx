import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionHeading from '@/components/ui/SectionHeading'
import chiropracticIcon from '@/assets/icons/specialty-chiropractic.svg'
import nutritionIcon from '@/assets/icons/specialty-nutrition.svg'
import mentalHealthIcon from '@/assets/icons/specialty-mental-health.svg'
import integrativeIcon from '@/assets/icons/specialty-integrative.svg'

/**
 * Specialties — four specialty cards, each a gradient panel (icon + gradient
 * title) melting into a white body with a short description and an "Explore"
 * link. Themes: Chiropractic (orange), Nutrition (yellow), Mental Health
 * (teal), Integrative Medicine (dark).
 */
// Softer panel gradients (saturated near the top, easing lighter toward the
// white fade at the bottom) — matches the Figma card look better than the full
// light→base→dark brand utilities, which read too harsh here.
const CARDS = [
  {
    name: 'Chiropractic',
    icon: chiropracticIcon,
    grad: 'linear-gradient(180deg, var(--color-orange), var(--color-orange-light))',
    title: 'text-grad-orange',
    body: 'Guided SOAP notes, spine-level charting, CMT coding, and outcome tracking.',
    link: 'Explore Chiropractic',
  },
  {
    name: 'Nutrition & Dietetics',
    icon: nutritionIcon,
    grad: 'linear-gradient(180deg, var(--color-yellow), var(--color-yellow-light))',
    title: 'text-grad-yellow',
    body: 'Food journals, meal plans, supplement tracking, and metabolic markers.',
    link: 'Explore Nutrition',
  },
  {
    name: 'Mental Health',
    icon: mentalHealthIcon,
    grad: 'linear-gradient(180deg, var(--color-teal), var(--color-teal-light))',
    title: 'text-grad-teal',
    body: 'PHQ-9, GAD-7, DSM-5 coding, therapy goals, and teletherapy workflows.',
    link: 'Explore Mental Health',
  },
  {
    name: 'Integrative Medicine',
    icon: integrativeIcon,
    grad: 'linear-gradient(180deg, #000000, var(--color-graphite))',
    title: 'text-ink',
    body: 'Functional labs, protocols, supplement plans, and whole-person care tracking.',
    link: 'Explore Integrative Medicine',
  },
]

export default function Specialties() {
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
      id="specialties"
      ref={root}
      className="pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32"
    >
      <div className="container-px flex flex-col gap-14 md:gap-20">
        <SectionHeading
          title="Built for the way you practice."
          lead="Most healthcare platforms are generic. KURALOGIQ adapts to the way your specialty works from intake forms and charting templates to outcomes tracking and care plans."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.name}
              data-reveal
              className="will-animate flex h-full flex-col rounded-[24px] border border-line bg-white p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
            >
              <div
                className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[18px]"
                style={{ backgroundImage: card.grad }}
              >
                <img
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-white" />
              </div>

              <div className="flex flex-1 flex-col gap-2 px-2.5 pb-2.5 pt-5">
                <h3
                  className={`font-display text-2xl leading-tight ${card.title}`}
                >
                  {card.name}
                </h3>
                <p className="text-fluid-sm font-light text-ink/90">{card.body}</p>
                <a
                  href="#specialties"
                  className="mt-auto pt-2 text-sm font-semibold text-ink transition-opacity duration-300 hover:opacity-70"
                >
                  {card.link} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
