import { useEffect, useState } from 'react'

/**
 * Returns true when the user has requested reduced motion.
 * Use it to skip/shorten animations — accessibility + perf on low-end devices.
 */
export function useReducedMotion() {
  // Read synchronously on init so the very first render already knows the
  // preference — otherwise a false→true flip re-runs GSAP after `from` has set
  // opacity:0, and the revert can leave content stuck hidden.
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
