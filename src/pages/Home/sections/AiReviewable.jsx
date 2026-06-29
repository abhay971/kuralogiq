import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

/**
 * AiReviewable — centered reassurance line ("Every AI suggestion is
 * reviewable...") with a dark CTA flanked by hairline rules.
 */
export default function AiReviewable() {
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
      <div className="container-px">
        <SectionHeading
          title={
            <>
              Every AI suggestion is reviewable.
              <br />
              Every signature stays with the provider.
            </>
          }
        >
          <div data-reveal className="mt-6 flex items-center justify-center gap-4">
            <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
            <Button href="#ai" variant="dark" className="border-4 border-white/20">
              Explore AI Capabilities
            </Button>
            <span aria-hidden="true" className="hidden h-px w-24 bg-ink/15 sm:block" />
          </div>
        </SectionHeading>
      </div>
    </section>
  )
}
