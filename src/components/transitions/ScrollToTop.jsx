import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/animations/gsap'

/**
 * On every route change: jump Lenis to the top and refresh ScrollTrigger so
 * the new page's scroll-driven animations measure against correct positions.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    // Let the new page paint, then recalc triggers.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, lenis])

  return null
}
