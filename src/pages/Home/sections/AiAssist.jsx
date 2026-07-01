import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * AiAssist — "AI that assists. Clinicians who decide."
 * Left: heading + copy. Right: AI capability cards as a STACK/DECK — the front
 * card is prominent with the others peeking below it. On each beat the front card
 * lifts up and out, then tucks to the back of the stack while the rest promote
 * forward (next becomes front). Continuous loop. Honors reduced-motion (static
 * stack, no cycling).
 */
const CARDS = [
  { title: 'AI-Assisted Documentation', desc: 'Draft notes and visit summaries faster.' },
  { title: 'Smart Coding Suggestions', desc: 'Accurate CPT & ICD-10 codes, instantly.' },
  { title: 'Insight Surfacing', desc: 'Spot trends across your patient panel.' },
  { title: 'Ambient Scribe', desc: 'Turn conversations into structured notes.' },
]

const N = CARDS.length

// Where a card sits given its depth in the stack (0 = front). Offsets are kept
// tight so only a single softer card peeks out below the front card.
const place = (slot) => ({
  y: slot * 9,
  scale: 1 - slot * 0.03,
  zIndex: N - slot,
})
const slotOf = (card, front) => (card - front + N) % N

export default function AiAssist() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [front, setFront] = useState(0)
  const prevFront = useRef(null)

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

  // Advance the deck on a slow, calm beat.
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setFront((f) => (f + 1) % N), 4200)
    return () => clearInterval(id)
  }, [reduceMotion])

  // Place / re-shuffle the deck whenever the front card changes.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('[data-card]', root.current)
      const outgoing = prevFront.current // card index that was at the front

      // First render (or reduced motion): drop every card straight into its slot.
      if (outgoing === null || reduceMotion) {
        cards.forEach((el, c) => {
          const p = place(slotOf(c, front))
          gsap.set(el, { y: p.y, scale: p.scale, zIndex: p.zIndex, autoAlpha: 1 })
        })
        prevFront.current = front
        return
      }

      cards.forEach((el, c) => {
        const p = place(slotOf(c, front))

        if (c === outgoing) {
          // Lift the old front up, fade it as it rises, then let it glide back
          // DOWN into the rear slot — one continuous arc, no hard teleport.
          const back = place(N - 1)
          gsap
            .timeline({ defaults: { ease: 'sine.inOut' } })
            .set(el, { zIndex: N + 2 })
            .to(el, { y: -84, scale: 1.05, duration: 1.0 })
            .to(el, { autoAlpha: 0, duration: 0.6 }, '<0.4')
            // reposition behind the deck while fully hidden (no visible jump)
            .set(el, { zIndex: back.zIndex, y: back.y + 46, scale: back.scale })
            .to(el, { y: back.y, autoAlpha: 1, duration: 1.0 })
        } else {
          // Everyone else promotes one step forward at the same calm pace.
          gsap.set(el, { zIndex: p.zIndex })
          gsap.to(el, { y: p.y, scale: p.scale, autoAlpha: 1, duration: 1.1, ease: 'sine.inOut' })
        }
      })

      prevFront.current = front
    },
    { scope: root, dependencies: [front, reduceMotion] }
  )

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

        {/* Right — card deck */}
        <div data-reveal className="will-animate relative mx-auto w-full max-w-[620px]">
          <div className="relative h-[250px] sm:h-[290px]">
            {CARDS.map((card) => (
              <div
                key={card.title}
                data-card
                className="bg-grad-orange absolute inset-x-0 top-4 flex min-h-[168px] items-center gap-5 rounded-[18px] p-6 text-white shadow-[0_18px_40px_rgba(244,117,73,0.30)] sm:min-h-[200px] sm:gap-6 sm:p-8"
              >
                <div className="size-16 shrink-0 rounded-[10px] bg-gradient-to-b from-[#fefeff] to-[#f1f2f5] sm:size-[84px]" />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-sans text-xl font-bold leading-tight text-balance sm:text-2xl">
                    {card.title}
                  </p>
                  <p className="font-sans text-fluid-sm font-light text-white/80">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
