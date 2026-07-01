import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionHeading from '@/components/ui/SectionHeading'
import schedulingIcon from '@/assets/icons/practice-scheduling.svg'
import engagementIcon from '@/assets/icons/practice-engagement.svg'

/**
 * PracticeAi — "AI Across Your Entire Practice." A full-bleed horizontal marquee
 * of wide capability cards (Figma node 461:3117), softly tinted with the Figma's
 * faded watermark icons (only Scheduling + Patient Engagement carry one), a serif
 * title, and a one-line description. The track scrolls continuously and fades out
 * at both edges. Honors reduced motion (static row).
 */
const CARDS = [
  { title: 'Clinical Documentation', desc: 'Instant patient overviews.', tint: 'rgba(2,2,1,0.04)' },
  { title: 'Scheduling', desc: 'Review key interactions quickly.', tint: 'rgba(249,151,106,0.20)', icon: schedulingIcon },
  { title: 'Patient Engagement', desc: 'See what still requires attention.', tint: 'rgba(89,242,194,0.22)', icon: engagementIcon },
  { title: 'Billing & Revenue Cycle', desc: 'Identify important trends faster.', tint: 'rgba(2,2,1,0.04)' },
]

function Card({ card }) {
  return (
    <article
      className="relative mr-5 flex aspect-[657/333] w-[min(82vw,600px)] shrink-0 flex-col justify-end overflow-hidden rounded-[28px] border border-line/70 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.05)] md:mr-6"
      style={{ backgroundImage: `linear-gradient(160deg, ${card.tint} 0%, rgba(255,255,255,0) 52%)` }}
    >
      {card.icon && (
        <img
          src={card.icon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[7%] top-[12%] h-28 w-28 md:h-36 md:w-36"
        />
      )}
      <div className="relative flex flex-col gap-1 p-8 md:p-10">
        <h3 className="font-display text-2xl leading-tight text-ink md:text-3xl">{card.title}</h3>
        <p className="text-fluid-sm font-light text-ink/55">{card.desc}</p>
      </div>
    </article>
  )
}

export default function PracticeAi() {
  const root = useRef(null)
  const track = useRef(null)
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

      // Seamless marquee: the track holds two identical sets; shift it left by
      // exactly one set (50% of its own width) and loop forever.
      const loop = gsap.to(track.current, {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1,
      })

      // Scroll-reactive: scrolling DOWN drives it one way, scrolling UP reverses
      // it, and faster scrolling briefly speeds it up. When scrolling stops it
      // eases back to a gentle drift in the last scroll direction.
      let settle
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction // 1 = down, -1 = up
          const boost = 1 + gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 350)
          gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true })
          settle?.kill()
          settle = gsap.delayedCall(0.45, () =>
            gsap.to(loop, { timeScale: dir, duration: 1.2, overwrite: true })
          )
        },
      })

      return () => {
        st.kill()
        settle?.kill()
      }
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px">
        <SectionHeading
          title="AI Across Your Entire Practice"
          lead="AI isn't a separate tool. It's built directly into the workflows your team already uses."
        />
      </div>

      <div className="relative mt-14 md:mt-16">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent md:w-40" />

        <div className="overflow-hidden">
          <div ref={track} className="flex w-max will-change-transform">
            {[...CARDS, ...CARDS].map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
