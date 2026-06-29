import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 3D scroll-tilt dashboard (GSAP port of the Aceternity "ContainerScroll").
 * The framed card starts tilted back on its X axis and rotates flat + scales
 * as it scrolls up through the viewport — a perspective "device standing up".
 * Implemented with ScrollTrigger (no framer-motion) to stay on our stack and
 * within the perf budget. Honors reduced-motion (renders flat, no scrub).
 */
export default function ScrollDashboard({ children, className }) {
  const container = useRef(null)
  const card = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) {
        gsap.set(card.current, { rotateX: 0, scale: 1 })
        return
      }
      gsap.fromTo(
        card.current,
        { rotateX: 24, scale: 1.05 },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 70%',
            end: 'top 12%',
            scrub: 0.6,
          },
        }
      )
    },
    { scope: container, dependencies: [reduceMotion] }
  )

  return (
    <div ref={container} className={className} style={{ perspective: '1200px' }}>
      <div
        ref={card}
        className="will-animate mx-auto w-full max-w-5xl rounded-[30px] border-4 border-[#6c6c6c] bg-[#222222] p-2 shadow-[0_0_#0000004d,0_9px_20px_#0000004a,0_37px_37px_#00000042,0_84px_50px_#00000026,0_149px_60px_#0000000a] md:p-4"
        style={{ transformOrigin: 'center top' }}
      >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  )
}
