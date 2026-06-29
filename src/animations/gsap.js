/**
 * Central GSAP setup. Imported once in main.jsx.
 * Register every plugin here so individual components never re-register.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Global defaults — keeps motion consistent and on-brand everywhere.
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

// Slightly throttles ScrollTrigger work on resize for smoother perf.
ScrollTrigger.config({ ignoreMobileResize: true })

// We own scroll position. By default ScrollTrigger forces
// history.scrollRestoration back to "auto" on every refresh() — which makes the
// browser restore the prior scroll on reload (landing you at the footer). This
// updates GSAP's remembered value so every refresh keeps it "manual"; we always
// start at the top (see ScrollToTop).
ScrollTrigger.clearScrollMemory('manual')

export { gsap, ScrollTrigger, useGSAP }
