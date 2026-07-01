import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Pulse from '@/components/ui/Pulse'
import ScrollDashboard from '@/components/ui/ScrollDashboard'
import HealthcareDashboard from '@/components/ui/HealthcareDashboard'

/**
 * Hero — "Your whole practice. One [pulse] platform." on the Figma sunrise
 * gradient (burnt-orange crown + bright yellow side-glows fading to the page
 * background), white serif headline, two pill CTAs, and a 3D scroll-tilt
 * dashboard.
 */
export default function Hero() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-line] span', { yPercent: 120, duration: 1.1, stagger: 0.08 })
        .from('[data-hero-sub]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { opacity: 0, y: 24, duration: 0.8 }, '-=0.5')
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  // --- Previous gradient hero background (kept for easy restore) ---
  // Apply by adding this back as the <section> style prop:
  // style={{
  //   background: [
  //     'linear-gradient(180deg, rgba(245,245,245,0) 82%, #f5f5f5 97%)',
  //     'radial-gradient(46% 38% at 0% 60%, rgba(255,221,64,0.92), rgba(255,221,64,0) 72%)',
  //     'radial-gradient(46% 38% at 100% 60%, rgba(255,221,64,0.92), rgba(255,221,64,0) 72%)',
  //     'linear-gradient(180deg, #481800 0%, #6e2600 9%, rgba(122,44,0,0) 36%)',
  //     'radial-gradient(115% 80% at 50% 4%, #8a3000 0%, #c64400 13%, #ee6410 25%, #ff8800 36%, #ffa61c 46%, #ffc346 56%, #ffd96e 66%, #ffe9a0 76%, #fff6da 88%, #f5f5f5 100%)',
  //   ].join(','),
  // }}
  return (
    <section
      ref={root}
      className="relative overflow-x-clip"
    >
      {/* --- SVG background (Figma export), inlined so its filters/blend-modes
          render reliably. cover via preserveAspectRatio="xMidYMin slice". --- */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 h-full w-full"
        width="1728"
        height="1696"
        viewBox="0 0 1728 1696"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_558_101)">
          <rect width="1728" height="1696" fill="#F5F5F5" />
          <g filter="url(#filter0_f_558_101)">
            <path d="M-174 -158H1903V1231H-174V-158Z" fill="url(#paint0_radial_558_101)" />
          </g>
          <g filter="url(#filter1_f_558_101)" style={{ mixBlendMode: 'plus-lighter' }}>
            <ellipse
              cx="-28.4294"
              cy="751.383"
              rx="186.606"
              ry="342.787"
              transform="rotate(-12.1496 -28.4294 751.383)"
              fill="white"
            />
          </g>
          <g filter="url(#filter2_f_558_101)" style={{ mixBlendMode: 'plus-lighter' }}>
            <ellipse
              cx="186.606"
              cy="342.787"
              rx="186.606"
              ry="342.787"
              transform="matrix(-0.977602 -0.210464 -0.210464 0.977602 2011.14 455.548)"
              fill="white"
            />
          </g>
          <g filter="url(#filter3_f_558_101)" style={{ mixBlendMode: 'plus-lighter' }}>
            <path d="M-237 1272H1903V1510H-237V1272Z" fill="white" />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_558_101"
            x="-282"
            y="-266"
            width="2293"
            height="1605"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="54" result="effect1_foregroundBlur_558_101" />
          </filter>
          <filter
            id="filter1_f_558_101"
            x="-804.656"
            y="-166.052"
            width="1552.45"
            height="1834.87"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_101" />
          </filter>
          <filter
            id="filter2_f_558_101"
            x="980.344"
            y="-166.052"
            width="1552.45"
            height="1834.87"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_101" />
          </filter>
          <filter
            id="filter3_f_558_101"
            x="-745"
            y="764"
            width="3156"
            height="1254"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="254" result="effect1_foregroundBlur_558_101" />
          </filter>
          <radialGradient
            id="paint0_radial_558_101"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(839.987 -158) rotate(90) scale(1265.77 3609.34)"
          >
            <stop stopColor="#822D00" />
            <stop offset="0.232092" stopColor="#CF4800" />
            <stop offset="0.443647" stopColor="#F77300" />
            <stop offset="0.585349" stopColor="#FF9100" />
            <stop offset="0.727051" stopColor="#FCCF3D" />
            <stop offset="1" stopColor="#F2F7F9" />
          </radialGradient>
          <clipPath id="clip0_558_101">
            <rect width="1728" height="1696" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Fade the hero's bottom edge into the page background (#f5f5f5) across
          the full width so the SVG's white glows don't create a seam with the
          section below (matches the old gradient's bottom-fade behaviour). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-b from-transparent to-[#f5f5f5]" />

      <div className="container-px relative z-10 flex flex-col items-center pt-32 text-center md:pt-40">
        <h1 className="font-display text-hero leading-[1.08] text-white">
          <span data-hero-line className="block overflow-hidden">
            <span className="block">Your whole practice.</span>
          </span>
          <span
            data-hero-line
            className="flex items-center justify-center gap-2 overflow-hidden md:gap-4"
          >
            <span className="inline-flex items-center gap-2 md:gap-4">
              One
              <Pulse className="inline-block h-[0.7em] w-auto text-white" />
              platform.
            </span>
          </span>
        </h1>

        <p data-hero-sub className="mt-6 max-w-4xl text-base font-light text-white/90 md:text-lg">
          Scheduling, specialty-deep charting, billing, patient engagement, telehealth, and
          AI-assisted workflows — all in one secure platform built for chiropractic, mental health,
          nutrition, and integrative care practices. From solo providers to multi-location
          organizations.
        </p>

        <div
          data-hero-cta
          className="relative z-10 mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-grad-dark px-9 py-4 font-display text-lg text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:text-xl"
          >
            Book a Demo
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-black/5 bg-gradient-to-b from-white to-[#f1f2f5] px-9 py-4 font-display text-lg text-ink shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:text-xl"
          >
            Try the Live Demo
          </a>
        </div>

        {/* 3D scroll-tilt dashboard */}
        <ScrollDashboard className="mt-8 w-full pb-16 md:mt-4 md:pb-24">
          <HealthcareDashboard />
        </ScrollDashboard>
      </div>
    </section>
  )
}
