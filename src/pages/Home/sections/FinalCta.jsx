import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import FinalCtaBackdrop from '@/pages/Home/sections/FinalCtaBackdrop'

/**
 * FinalCta — closing call-to-action band (Figma #13). The Figma dome gradient,
 * rebuilt as a CSS radial using the exact sampled colours (white → cyan #67edff
 * → blue #0467fd → deep navy #011138). A radial curves into a real dome (no flat
 * band / hard seam) and blends softly up into the white section above. Ends on
 * navy so the footer connects with no seam.
 */
export default function FinalCta() {
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
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      // Background now comes from the inlined Figma <FinalCtaBackdrop />.
      // Previous hand-built CSS dome (kept for easy restore):
      // style={{
      //   background:
      //     'radial-gradient(150% 105% at 50% 100%, #011138 0%, #011138 34%, #012571 43%, #01329c 49%, #013ec2 54%, #014be9 59%, #0467fd 64%, #0d8fff 70%, #35beff 76%, #67edff 81%, #a9ffff 86%, #e6ffff 90%, #ffffff 93%, #ffffff 100%)',
      // }}
    >
      <FinalCtaBackdrop />
      <div className="container-px relative z-10 flex flex-col items-center text-center">
        <h2
          data-reveal
          className="max-w-4xl font-display text-h2 leading-[1.08] text-white text-balance md:text-hero md:leading-[1.05]"
        >
          Ready to run your practice on one platform?
        </h2>

        <p
          data-reveal
          className="mt-6 max-w-4xl text-sm font-light text-white/85 text-pretty md:text-base lg:whitespace-nowrap"
        >
          See how KURALOGIQ can simplify operations, reduce administrative work, and support better
          patient outcomes.
        </p>

        <div
          data-reveal
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#demo"
            className="inline-flex h-14 items-center justify-center rounded-full bg-grad-dark px-9 font-display text-lg whitespace-nowrap text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Book a Demo
          </a>
          <a
            href="#demo"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-9 font-display text-lg whitespace-nowrap text-ink shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Try the Live Demo
          </a>
        </div>
      </div>
    </section>
  )
}
