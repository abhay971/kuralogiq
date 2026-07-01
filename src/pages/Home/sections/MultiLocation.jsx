import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import featureIcon from '@/assets/icons/multilocation-feature.svg'

/**
 * MultiLocation — full-bleed deep-teal section. A product visual on the left,
 * "One platform across every location." headline + copy + CTA on the right,
 * with a row of four multi-site capability pills underneath.
 */
const FEATURES = [
  'Organization Hierarchy',
  'Franchise & Corporate Models',
  'Centralized Operations',
  'Cross-Location Reporting',
]

export default function MultiLocation() {
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
      className="overflow-hidden py-14 text-white md:py-20"
      // Background now comes from the shared <BandBackdrop /> (see Home.jsx).
      // Previous per-section gradient:
      // style={{
      //   background:
      //     'linear-gradient(180deg, #0a0807 0%, #08130d 26%, #0a2516 52%, #0e3622 80%, #0f3a26 100%)',
      // }}
    >
      <div className="container-px">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div
            data-reveal
            className="will-animate aspect-[4/3] w-full rounded-[24px] border border-white/10 bg-gradient-to-b from-white to-[#eef1ef] shadow-[0_24px_60px_rgba(0,0,0,0.18)] lg:aspect-square"
          />

          {/* Copy */}
          <div className="flex h-fit flex-col items-start gap-5 self-start">
            <h2
              data-reveal
              className="will-animate font-display text-h2 leading-[1.05] text-balance"
            >
              One platform across every location.
            </h2>
            <p data-reveal className="will-animate text-lead font-bold text-pretty">
              Built for growing healthcare organizations, franchise networks, and multi-site
              practices.
            </p>
            <p data-reveal className="will-animate text-lead font-light text-white/80 text-pretty">
              Manage providers, clinics, reporting, schedules, billing structures, and operational
              workflows from a single connected ecosystem.
            </p>
            <a
              href="#charting"
              className="mt-2 rounded-full border border-white/20 bg-gradient-to-b from-white to-[#f1f2f5] px-6 py-4 font-display text-lg font-bold text-black transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
            >
              Explore Charting
            </a>
          </div>
        </div>

        {/* Capability pills: 1 → 2 → 4 col */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {FEATURES.map((label) => (
            <div
              key={label}
              data-reveal
              className="will-animate flex items-center gap-4 rounded-[48px] border-4 border-white/10 bg-gradient-to-r from-white/20 to-white/[0.08] py-2 pl-2 pr-6 shadow-[0_0_36px_rgba(0,0,0,0.1)]"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white">
                <img src={featureIcon} alt="" width={28} height={28} className="size-7" />
              </span>
              <span className="text-lg font-bold leading-tight text-balance">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
