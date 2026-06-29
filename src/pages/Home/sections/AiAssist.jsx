import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * AiAssist — "AI that assists. Clinicians who decide."
 * Left: heading + copy. Right: AI cards on a 3D ROLODEX/drum — each card sits
 * on a horizontal cylinder; the front card rests flat, then rolls up and over
 * the top as the next rolls up from below. Continuous loop with a brief rest at
 * front for readability. Honors reduced-motion (static front card).
 */
const CARDS = [
  { title: 'AI-Assisted Documentation', desc: 'Draft notes and visit summaries faster.' },
  { title: 'Smart Coding Suggestions', desc: 'Accurate CPT & ICD-10 codes, instantly.' },
  { title: 'Insight Surfacing', desc: 'Spot trends across your patient panel.' },
  { title: 'Ambient Scribe', desc: 'Turn conversations into structured notes.' },
]

const RADIUS = 150 // cylinder radius (px)
const STEP = 360 / CARDS.length

export default function AiAssist() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  // Reveal on scroll
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

  // 3D rolodex drum
  useEffect(() => {
    const cards = gsap.utils.toArray('[data-card]', root.current)
    const drum = { angle: 0 }

    // Position every card on the cylinder for the current drum angle.
    const render = () => {
      cards.forEach((el, i) => {
        const deg = i * STEP + drum.angle
        const facing = Math.cos((deg * Math.PI) / 180) // 1 = front, <0 = back
        el.style.transform = `rotateX(${deg}deg) translateZ(${RADIUS}px)`
        el.style.opacity = facing > 0.04 ? String(0.18 + facing * 0.82) : '0'
        el.style.zIndex = String(Math.round((facing + 1) * 100))
      })
    }

    render()
    if (reduceMotion) return

    // Step the drum one card every cycle: quick flip, then rest at front.
    const id = setInterval(() => {
      gsap.to(drum, { angle: drum.angle - STEP, duration: 0.95, ease: 'power3.inOut', onUpdate: render })
    }, 3000)

    return () => {
      clearInterval(id)
      gsap.killTweensOf(drum)
    }
  }, [reduceMotion])

  return (
    <section id="ai" ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px grid items-center gap-12 md:gap-16 lg:grid-cols-2">
        {/* Left — heading + copy */}
        <div className="flex flex-col gap-4">
          <h2 data-reveal className="font-display text-h2 leading-[1.05] text-ink text-balance">
            AI that assists.
            <br />
            Clinicians who decide.
          </h2>
          <p data-reveal className="text-lead font-semibold text-ink">
            AI should help you move faster, not make decisions for you.
          </p>
          <p data-reveal className="text-lead font-light text-ink/80 text-pretty">
            KURALOGIQ uses AI to reduce repetitive work, surface meaningful insights, and help your
            team stay focused on patient care while keeping every clinical decision in human hands.
          </p>
        </div>

        {/* Right — 3D rolodex drum */}
        <div data-reveal className="will-animate relative mx-auto w-full max-w-[560px]">
          <div className="relative h-[300px] [perspective:1100px]">
            {CARDS.map((card) => (
              <div
                key={card.title}
                data-card
                className="bg-grad-orange absolute inset-x-0 top-1/2 -mt-[75px] flex h-[150px] items-center gap-5 rounded-[16px] p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] [backface-visibility:hidden] sm:-mt-[85px] sm:h-[170px] sm:gap-6 sm:p-8"
              >
                <div className="size-16 shrink-0 rounded-[8px] border-4 border-white/20 bg-gradient-to-b from-[#fefeff] to-[#f1f2f5] sm:size-[96px]" />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-sans text-xl font-bold leading-tight text-balance sm:text-2xl">
                    {card.title}
                  </p>
                  <p className="font-sans text-fluid-sm font-light text-white/75">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
