import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'

/**
 * AiReviewable — centered reassurance headline with a word-by-word scroll reveal
 * (each word brightens from dim into full focus, scrubbed to scroll position),
 * then a dark CTA flanked by hairline rules.
 */
const LINES = [
  ['Every', 'AI', 'suggestion', 'is', 'reviewable.'],
  ['Every', 'signature', 'stays', 'with', 'the', 'provider.'],
]

export default function AiReviewable() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return

      // Word-by-word focus reveal, tied to scroll position. Only opacity +
      // transform animate (per project perf rules — no blur/filter on scroll).
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.12, yPercent: 24 },
        {
          opacity: 1,
          yPercent: 0,
          ease: 'none',
          stagger: 0.4,
          scrollTrigger: {
            trigger: '[data-heading]',
            start: 'top 82%',
            end: 'top 38%',
            scrub: true,
          },
        }
      )

      // CTA — simple fade-up once it enters.
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <h2 data-heading className="font-display text-h2 leading-[1.05] text-ink text-balance">
            {LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <span
                    key={wi}
                    data-word
                    className="mr-[0.25em] inline-block will-change-[opacity,transform]"
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div data-reveal className="mt-8 flex items-center justify-center gap-4">
            <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
            <Button href="#ai" variant="dark">
              Explore AI Capabilities
            </Button>
            <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
