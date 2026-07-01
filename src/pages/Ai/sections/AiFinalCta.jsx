import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import FinalCtaBackdrop from '@/pages/Home/sections/FinalCtaBackdrop'

/**
 * AiFinalCta — closing call-to-action on the /ai page (Figma node 461:2933 on
 * the blue dome Group 65). Reuses the shared FinalCtaBackdrop so the dome blends
 * into the footer's navy with no seam.
 */
export default function AiFinalCta() {
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
    <section ref={root} className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <FinalCtaBackdrop />
      {/* Corner glows (CSS — browser-consistent). Over the SVG, under content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(72% 55% at 0% 16%, rgba(255,255,255,0.42), rgba(255,255,255,0) 80%)',
            'radial-gradient(72% 55% at 100% 16%, rgba(255,255,255,0.42), rgba(255,255,255,0) 80%)',
          ].join(','),
        }}
      />
      <div className="container-px relative z-10 flex flex-col items-center text-center">
        <h2
          data-reveal
          className="max-w-4xl font-display text-h2 leading-[1.08] text-white text-balance md:text-hero md:leading-[1.05]"
        >
          See the AI work on real patient workflows.
        </h2>

        <p
          data-reveal
          className="mt-6 max-w-3xl text-sm font-light text-white/85 text-pretty md:text-base"
        >
          Explore AI-assisted documentation, smart summaries, coding support, and predictive insights
          inside a fully functional KURALOGIQ demo environment.
        </p>

        <div
          data-reveal
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#demo"
            className="inline-flex h-16 items-center justify-center rounded-full bg-grad-dark px-10 font-display text-xl whitespace-nowrap text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Book a Demo
          </a>
          <a
            href="#demo"
            className="inline-flex h-16 items-center justify-center rounded-full bg-white px-10 font-display text-xl whitespace-nowrap text-ink shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Try the Live Demo
          </a>
        </div>
      </div>
    </section>
  )
}
