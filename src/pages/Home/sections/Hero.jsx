import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Pulse from '@/components/ui/Pulse'
import ShaderBackground from '@/components/ui/ShaderBackground'
// --- Previous hero (gradient + 3D scroll dashboard) — kept for easy revert ---
// import ScrollDashboard from '@/components/ui/ScrollDashboard'
// import HealthcareDashboard from '@/components/ui/HealthcareDashboard'

/**
 * Hero — "Your whole practice. One [pulse] platform." over an animated WebGL
 * shader background (fiery nebula). White serif headline + two pill CTAs.
 *
 * The previous sunrise-gradient + 3D dashboard hero is preserved (commented)
 * at the bottom of this file so we can switch back if we prefer that design.
 */
export default function Hero() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-line] span', { yPercent: 120, duration: 1.1, stagger: 0.08 })
        .from('[data-hero-sub]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.5')
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
    >
      {/* Animated shader background (lazy GPU render, pauses offscreen) */}
      <ShaderBackground reduceMotion={reduceMotion} />

      {/* Soft vignette so the headline keeps contrast over the bright nebula */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="container-px relative z-10 flex flex-col items-center py-32 text-center">
        <h1 className="font-display text-hero leading-[1.08] text-white">
          <span data-hero-line className="block overflow-hidden">
            <span className="block">Your whole practice.</span>
          </span>
          <span
            data-hero-line
            className="flex items-center justify-center gap-2 overflow-hidden md:gap-4"
          >
            <span className="inline-flex items-center gap-2 md:gap-4">
              One
              <Pulse className="inline-block h-[0.7em] w-auto text-white" />
              platform.
            </span>
          </span>
        </h1>

        <p data-hero-sub className="mt-6 max-w-4xl text-base font-light text-white/90 md:text-lg">
          Scheduling, specialty-deep charting, billing, patient engagement, telehealth, and
          AI-assisted workflows — all in one secure platform built for chiropractic, mental health,
          nutrition, and integrative care practices. From solo providers to multi-location
          organizations.
        </p>

        <div
          data-hero-cta
          className="relative z-10 mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="#demo"
            className="flex-1 rounded-[2.25rem] border-4 border-white/20 bg-grad-dark px-8 py-5 font-display text-xl text-white transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:text-2xl"
          >
            Book a Demo
          </a>
          <a
            href="#demo"
            className="flex-1 rounded-[2.25rem] border-4 border-white/20 bg-gradient-to-b from-white to-[#f1f2f5] px-8 py-5 font-display text-xl text-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:text-2xl"
          >
            Try the Live Demo
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   PREVIOUS HERO — sunrise gradient + 3D scroll-tilt dashboard.
   Restore by swapping the <section> above for this and re-enabling the
   ScrollDashboard / HealthcareDashboard imports at the top of the file.
   ----------------------------------------------------------------------------

  return (
    <section
      ref={root}
      className="relative overflow-hidden"
      style={{
        background: [
          // white fade at the very bottom so the hero's bottom edge is uniformly
          // #ffffff across the full width — seamless with the white section below
          // (no seam / bifurcation line).
          'linear-gradient(180deg, rgba(255,255,255,0) 82%, #ffffff 97%)',
          // bright yellow side-glows (Figma plus-lighter ellipses)
          'radial-gradient(46% 38% at 0% 60%, rgba(255,221,64,0.92), rgba(255,221,64,0) 72%)',
          'radial-gradient(46% 38% at 100% 60%, rgba(255,221,64,0.92), rgba(255,221,64,0) 72%)',
          // dark burnt-orange crown across the top (uniform), fading out by ~36%
          'linear-gradient(180deg, #481800 0%, #6e2600 9%, rgba(122,44,0,0) 36%)',
          // radial "sun" dome → gives the semi-rounded gradient finish at the bottom
          'radial-gradient(115% 80% at 50% 4%, #8a3000 0%, #c64400 13%, #ee6410 25%, #ff8800 36%, #ffa61c 46%, #ffc346 56%, #ffd96e 66%, #ffe9a0 76%, #fff6da 88%, #ffffff 100%)',
        ].join(','),
      }}
    >
      <div className="container-px flex flex-col items-center pt-32 text-center md:pt-40">
        ... headline / subtitle / CTAs (same as above) ...

        // 3D scroll-tilt dashboard
        <ScrollDashboard className="mt-8 w-full pb-16 md:mt-4 md:pb-24">
          <HealthcareDashboard />
        </ScrollDashboard>
      </div>
    </section>
  )

   ========================================================================== */
