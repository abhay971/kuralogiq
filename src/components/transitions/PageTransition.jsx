import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Lightweight page-enter transition. Wraps route content and fades/slides it in.
 * Keyed by pathname in App.jsx so it replays on every navigation.
 *
 * Note: this is an ENTER-only transition (reliable + cheap). For coordinated
 * exit→enter transitions, introduce an overlay/curtain element here and animate
 * it out on mount; documented in CLAUDE.md.
 */
export default function PageTransition({ children }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) {
        gsap.set(ref.current, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
    },
    { scope: ref, dependencies: [reduceMotion] }
  )

  return (
    <div ref={ref} className="will-animate">
      {children}
    </div>
  )
}
