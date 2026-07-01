import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import dashboard from '@/assets/images/ai-dashboard.jpg'

/**
 * AiHero — top of the /ai page (Figma node 461:2906 header block).
 * Centered serif headline "AI that assists. Clinicians who decide.", a muted
 * lead paragraph, two compact pill CTAs, and a product dashboard screenshot
 * that lifts in on load. Light background matching the page.
 */
export default function AiHero() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-line] span', { yPercent: 120, duration: 1.1, stagger: 0.08 })
        .from('[data-hero-sub]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.5')
        .from('[data-hero-dash]', { opacity: 0, y: 60, duration: 1.1 }, '-=0.4')
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="relative overflow-x-clip pt-32 md:pt-40">
      <div className="container-px relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-hero leading-[1.08] text-ink text-balance">
          <span data-hero-line className="block overflow-hidden">
            <span className="block">AI that assists. Clinicians who decide.</span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-6 max-w-6xl text-lead font-light text-ink/70 text-pretty"
        >
          KURALOGIQ puts AI where it actually helps—reducing documentation time, surfacing
          meaningful insights, and streamlining administrative work—while every clinical decision
          and every signature stays with the provider.
        </p>

        <div
          data-hero-cta
          className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-grad-dark px-9 py-4 font-display text-lg text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Book a Demo
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-black/5 bg-gradient-to-b from-white to-[#f1f2f5] px-9 py-4 font-display text-lg text-ink shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
          >
            Try the Live Demo
          </a>
        </div>

        {/* Product dashboard screenshot — borderless, cropped to the Figma's
            wide, short band (balances → recent activity) so it reads as a
            floating screen rather than a boxed card. */}
        <div data-hero-dash className="will-animate mt-10 w-full max-w-[1328px] md:mt-12">
          <img
            src={dashboard}
            alt="KURALOGIQ dashboard showing balances, income and recent activity"
            width={736}
            height={552}
            fetchPriority="high"
            decoding="async"
            className="aspect-[1328/430] w-full rounded-[14px] object-cover object-[50%_44%] shadow-[0_28px_70px_rgba(0,0,0,0.16)] md:rounded-[18px]"
          />
        </div>
      </div>
    </section>
  )
}
