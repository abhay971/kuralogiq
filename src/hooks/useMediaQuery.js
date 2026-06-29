import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query from JS.
 * Handy for running different GSAP timelines per breakpoint.
 *
 * @example const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
