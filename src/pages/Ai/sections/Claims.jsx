import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import folder from '@/assets/images/finishnote-folder.svg'

/**
 * Claims — "Cleaner claims start with better documentation." The home page's
 * folder illustration card on the left; on the right a serif heading, a bold
 * intro + regular lead, and four dark coding-support pills in a 2×2 layout
 * (Figma node 461:3096 + 461:3099).
 */
const TAG_ROWS = [
  ['Coding Suggestions', 'Documentation Alignment'],
  ['Faster Claim Preparation', 'You Stay In Control'],
]

export default function Claims() {
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
      <div className="container-px grid items-center gap-10 md:gap-16 lg:grid-cols-[minmax(0,520px)_1fr]">
        {/* Left — folder illustration (same card as the home page) */}
        <div
          data-reveal
          className="will-animate relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[24px] border border-line/40 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.02)]"
        >
          <img
            src={folder}
            alt="Stack of claim documents"
            width={432}
            height={387}
            loading="lazy"
            decoding="async"
            className="w-[112%] max-w-none translate-x-[3%] translate-y-[2%]"
          />
        </div>

        {/* Right — copy + dark pills */}
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-display leading-[1.05] text-ink text-[clamp(2.125rem,1.3rem+2.8vw,3.25rem)]">
            <span data-reveal className="block">
              Cleaner claims start with better documentation.
            </span>
          </h2>
          <p data-reveal className="max-w-xl text-lead text-pretty">
            <span className="font-semibold text-ink">
              Documentation and billing should work together.
            </span>
          </p>
          <p data-reveal className="-mt-2 max-w-xl text-lead font-light text-ink/70 text-pretty">
            KURALOGIQ provides AI-assisted coding support to help providers identify relevant coding
            options based on documented care.
          </p>

          <div className="mt-2 flex flex-col gap-3">
            {TAG_ROWS.map((row, r) => (
              <div key={r} className="flex flex-wrap gap-3">
                {row.map((tag) => (
                  <span
                    key={tag}
                    data-reveal
                    className="whitespace-nowrap rounded-full bg-grad-dark px-6 py-3 text-fluid-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.20)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
