import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

/**
 * Faq — the accordion at the foot of the /ai page (Figma nodes 461:3114 +
 * 461:3178). Six questions; the first is open by default. Each row expands with
 * a max-height/opacity transition and a +/× toggle.
 */
const ITEMS = [
  {
    q: 'Does AI make clinical decisions?',
    a: 'No. AI assists providers with documentation, summaries, insights, and recommendations. Clinical decisions remain entirely with the provider.',
  },
  {
    q: 'Can providers edit AI-generated content?',
    a: 'Yes. Every AI-generated draft is fully editable. Providers review, refine, and finalize all content before it enters the medical record.',
  },
  {
    q: 'Does AI sign notes automatically?',
    a: 'Never. AI drafts and suggests, but finalizing and signing documentation always requires an explicit action from the provider.',
  },
  {
    q: 'Is patient information protected?',
    a: 'Yes. AI features operate under the same enterprise-grade security architecture used across KURALOGIQ, including encryption in transit and at rest.',
  },
  {
    q: 'Can AI help reduce documentation time?',
    a: 'It can. By turning structured visit information into organized drafts, AI helps providers finish notes in significantly less time.',
  },
  {
    q: 'Are AI features included in every plan?',
    a: 'AI-assisted workflows are available across plans, with capabilities scaling to the needs of solo providers through multi-location organizations.',
  },
]

function Row({ item, open, onToggle }) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-xl leading-tight text-ink text-balance md:text-2xl">
          {item.q}
        </span>
        <span className="relative size-5 shrink-0 text-ink">
          <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span
            className={cn(
              'absolute left-1/2 top-1/2 h-full w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300',
              open && 'rotate-90 opacity-0'
            )}
          />
        </span>
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-[var(--ease-out-expo)]',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="min-h-0">
          <p className="max-w-3xl pb-6 text-base font-light text-ink/70 text-pretty">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(0)

  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 40,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px flex flex-col items-center gap-12 md:gap-16">
        <h2 data-reveal className="font-display text-hero leading-[1.05] text-ink">
          FAQ
        </h2>

        <div className="w-full max-w-4xl">
          {ITEMS.map((item, i) => (
            <div key={item.q} data-reveal>
              <Row item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
