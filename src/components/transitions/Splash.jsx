import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import logoLockup from '@/assets/icons/logo-lockup-on-dark.png'

/**
 * Splash / preloader — the first thing every visitor sees.
 *
 * Sequence (single GSAP timeline):
 *   1. Reveal  — the official brand lockup (white + gradient pulse) wipes in
 *                left→right like an EKG writing itself; a soft bloom throbs
 *                once behind it as the heartbeat lands.
 *   2. Load    — a 000→100 counter and a hairline progress bar fill in sync.
 *   3. Exit    — the lockup lifts out, then the overlay splits into vertical
 *                columns that slide up in a staggered curtain, unveiling the site.
 *
 * Notes
 * - The wipe is two mirrored transforms (wrapper slides right while the image
 *   counter-slides left inside overflow-hidden) — no width/clip animation, so
 *   it stays on the GPU. Only `transform`/`opacity` are animated; 60fps-safe.
 * - Background: deep neutral graphite with faint orange (left) and teal (right)
 *   auras — the two endpoints of the brand pulse gradient — plus vignette and
 *   film grain. It is baked into the curtain columns via a seamless
 *   full-viewport slice per column, so the image itself breaks apart on reveal.
 * - Scroll is locked via the shared `lenis-stopped` class (same pattern as the
 *   mobile menu) and released the instant the curtain lifts.
 * - `prefers-reduced-motion`: the splash is skipped entirely (no lock, no flash).
 * - Runs once per page load. It lives above <Layout> in App and unmounts when
 *   done, so route changes never replay it.
 */

const PANELS = 5

// Designed backdrop — neutral graphite, vignette, and the two brand-pulse
// endpoint auras (orange low-left, teal low-right). Painted full-viewport
// inside every column so the columns tile into one seamless image.
const BG =
  'radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.6) 100%),' +
  'radial-gradient(52% 44% at 12% 88%, rgba(238,83,39,0.14) 0%, rgba(238,83,39,0) 70%),' +
  'radial-gradient(52% 44% at 88% 88%, rgba(54,193,149,0.12) 0%, rgba(54,193,149,0) 70%),' +
  'radial-gradient(90% 70% at 50% 32%, #1b1b1b 0%, #101010 52%, #0a0a0a 100%)'

// Tiny fractal-noise tile → subtle film grain (overlay blend, low opacity).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Splash() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [done, setDone] = useState(reduceMotion)

  useGSAP(
    () => {
      const html = document.documentElement

      // Reduced motion / no window: don't lock, don't animate, just get out.
      if (reduceMotion) {
        html.classList.remove('lenis-stopped')
        return
      }

      // Lock scroll and pin to top for the duration of the splash.
      html.classList.add('lenis-stopped')
      window.scrollTo(0, 0)

      const count = root.current.querySelector('[data-splash-count]')
      const counter = { v: 0 }

      const finish = () => {
        html.classList.remove('lenis-stopped')
        setDone(true)
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: finish,
      })

      // --- 1. Lockup wipes in (EKG writing itself), bloom throbs ------------
      // Wrapper slides in from the left while the image counter-slides from the
      // right — identical duration/ease so they cancel into a clean L→R wipe.
      tl.fromTo(
        '[data-splash-wipe]',
        { x: '-101%' },
        { x: '0%', duration: 1.15, ease: 'power3.inOut' },
        0.1
      )
        .fromTo(
          '[data-splash-logo]',
          { x: '101%' },
          { x: '0%', duration: 1.15, ease: 'power3.inOut' },
          0.1
        )
        .fromTo(
          '[data-splash-glow]',
          { scale: 0.75, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'power2.out' },
          0.45
        )
        // Heartbeat throb as the wipe crosses the pulse in the K.
        .to('[data-splash-glow]', { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 1.3)

      // --- 2. Load (counter + bar in sync) -----------------------------------
      tl.fromTo('[data-splash-meta]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.9)
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
              count.textContent = String(Math.round(counter.v)).padStart(3, '0')
            },
          },
          0.6
        )
        .fromTo('[data-splash-bar]', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.6)

      // --- 3. Exit ------------------------------------------------------------
      tl.to('[data-splash-wipe]', { y: -44, autoAlpha: 0, duration: 0.55, ease: 'power3.in' }, 'exit')
        .to('[data-splash-glow]', { scale: 1.15, autoAlpha: 0, duration: 0.7, ease: 'power2.in' }, 'exit')
        .to(
          ['[data-splash-meta]', '[data-splash-bar-track]'],
          { autoAlpha: 0, duration: 0.4, ease: 'power2.in' },
          'exit'
        )
        .to(
          '[data-splash-panel]',
          { yPercent: -101, duration: 0.9, ease: 'power4.inOut', stagger: 0.07 },
          'exit+=0.1'
        )
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  if (done) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0a0a0a]"
      role="status"
      aria-label="Loading Kuralogiq"
    >
      {/* Curtain — each column paints a full-viewport slice of the same designed
          background, so together they form one seamless image that breaks into
          rising columns on reveal. */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <div key={i} data-splash-panel className="relative h-full flex-1 overflow-hidden">
            <div
              className="absolute inset-y-0"
              style={{ width: '100vw', left: `-${i * 100}%`, background: BG }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat', opacity: 0.05, mixBlendMode: 'overlay' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Soft bloom behind the lockup — throbs once when the heartbeat lands. */}
      <div
        data-splash-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2 will-animate"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.025) 40%, rgba(10,10,10,0) 70%)',
        }}
      />

      {/* Official lockup — L→R wipe via mirrored wrapper/image transforms. */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div data-splash-wipe className="overflow-hidden will-animate" style={{ transform: 'translateX(-101%)' }}>
          <img
            data-splash-logo
            src={logoLockup}
            alt="Kuralogiq — Premium Practice Management & EHR"
            width={1400}
            height={256}
            className="h-auto w-[clamp(260px,64vw,660px)] will-animate"
            style={{ transform: 'translateX(101%)' }}
          />
        </div>
      </div>

      {/* Bottom meta row: status label · counter. */}
      <div
        data-splash-meta
        className="container-px absolute inset-x-0 bottom-6 flex items-end justify-between md:bottom-8"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-white/40 md:text-xs">
          Loading experience
        </span>
        <span className="font-sans text-2xl font-light tabular-nums text-white/75 md:text-3xl">
          <span data-splash-count>000</span>
          <span className="text-white/30">%</span>
        </span>
      </div>

      {/* Hairline progress bar pinned to the very bottom edge — brand pulse
          gradient (orange → yellow → teal). */}
      <div data-splash-bar-track className="absolute inset-x-0 bottom-0 h-px bg-white/10">
        <div
          data-splash-bar
          className="h-full origin-left bg-gradient-to-r from-orange via-yellow to-teal will-animate"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
