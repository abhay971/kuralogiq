import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import iconEncryption from '@/assets/icons/security-encryption.png'
import iconRbac from '@/assets/icons/security-rbac.png'
import iconSessionTimeout from '@/assets/icons/security-session-timeout.png'
import iconConsent from '@/assets/icons/security-consent.png'
import iconFinalization from '@/assets/icons/security-finalization.png'

/**
 * Security — "Security isn't a feature. It's the foundation." A dark panel
 * with five enterprise-grade trust cards (3 on top, 2 on the bottom row on
 * desktop). Each card stacks a black product-render visual over a serif title.
 */
const CARDS = [
  { title: 'Encryption at Rest & In Transit', icon: iconEncryption },
  { title: 'Role-Based Access Control', icon: iconRbac },
  { title: 'Automatic Session Timeout', icon: iconSessionTimeout },
  { title: 'Consent Management & Audit Trails', icon: iconConsent },
  { title: 'Provider-Only Finalization Controls', icon: iconFinalization },
]

export default function Security() {
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
      className="py-14 text-white md:py-20"
      style={{
        background: [
          // bright teal/cyan side-glows around the cards (left + right)
          'radial-gradient(34% 44% at 0% 56%, rgba(0,235,185,0.6), transparent 60%)',
          'radial-gradient(34% 44% at 100% 56%, rgba(0,235,185,0.6), transparent 60%)',
          // deep green (top) → teal/cyan → light cyan → near-white (Figma ends #F2F7F9)
          'linear-gradient(180deg, #0f3a26 0%, #0a5a40 16%, #0a8268 33%, #12a890 50%, #57cfc2 68%, #b7efe8 86%, #f2f7f9 100%)',
        ].join(','),
      }}
    >
      <div className="container-px">
        {/* Heading */}
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h2
            data-reveal
            className="will-animate font-display text-h2 leading-[1.05] whitespace-normal md:whitespace-nowrap"
          >
            Security isn&apos;t a feature. It&apos;s the foundation.
          </h2>
          <p
            data-reveal
            className="will-animate text-lead font-light text-white/80 text-pretty"
          >
            Healthcare data deserves enterprise-grade protection.
          </p>
        </div>

        {/* Cards: 1 col → 2 col (sm) → 6-col grid (lg): top row 3×(span 2),
            bottom row 2×(span 3) so the bottom cards fill the full width. */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {CARDS.map((card, i) => (
            <div
              key={card.title}
              data-reveal
              className={`will-animate flex flex-col items-center gap-4 rounded-[24px] border-4 border-black/10 bg-black/30 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.06)] ${
                i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              }`}
            >
              <div className="flex h-40 w-full items-center justify-center rounded-[16px] bg-grad-dark md:h-44">
                <img
                  src={card.icon}
                  alt=""
                  width={64}
                  height={67}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-14"
                />
              </div>
              <h3 className="pb-2 font-display text-2xl leading-[1.15] text-center text-white text-balance">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
