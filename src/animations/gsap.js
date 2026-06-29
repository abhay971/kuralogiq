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

export { gsap, ScrollTrigger, useGSAP }
