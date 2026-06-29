import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Keeps GSAP ScrollTrigger in sync with Lenis: every Lenis scroll tick calls
 * ScrollTrigger.update(). Lives inside <ReactLenis> so useLenis() resolves.
 */
function ScrollTriggerBridge() {
  useLenis(() => ScrollTrigger.update())

  useEffect(() => {
    // Layout/fonts settle after mount — recalc trigger positions once.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])

  return null
}

/**
 * Global Lenis smooth scroll. ReactLenis manages its own rAF loop (autoRaf,
 * the default) — reliable across versions. Smooth wheel is disabled when the
 * user prefers reduced motion; native momentum is kept on touch.
 */
export default function SmoothScrollProvider({ children }) {
  const reduceMotion = useReducedMotion()

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: !reduceMotion,
        syncTouch: false,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
