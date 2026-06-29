import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import demoDashboard from '@/assets/images/demo-dashboard.jpg'

/**
 * TakeTheDemo — "Don't take our word for it. Take the demo." A light card with
 * a benefit checklist + dual CTAs on the left and a fully-populated product
 * dashboard screenshot on the right (stacks to a single column on mobile).
 */
const BENEFITS = [
  { label: 'Build a SOAP note in under a minute', grad: 'bg-grad-orange' },
  { label: 'Schedule a full day of appointments', grad: 'bg-grad-yellow' },
  { label: 'Explore AI-assisted documentation', grad: 'bg-grad-dark' },
  { label: 'Run an AR aging report', grad: 'bg-grad-teal' },
]

function Check() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <path
        d="M3.75 9.5 7.25 13l7-8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TakeTheDemo() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 48,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section
      id="pricing"
      ref={root}
      className="bg-white pt-14 pb-8 md:pt-20 md:pb-10"
    >
      <div className="container-px">
        <div
          className="overflow-hidden rounded-[28px] border-4 border-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.08)] sm:p-10 md:border-8 lg:p-14"
          style={{
            backgroundImage:
              'linear-gradient(190deg, #d7d7d7 28%, #ffffff 63%)',
          }}
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left — copy, checklist, CTAs */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2
                  data-reveal
                  className="will-animate font-display text-h2 leading-[1.05] text-ink text-balance"
                >
                  Don&apos;t take our word for it. Take the demo.
                </h2>
                <p
                  data-reveal
                  className="will-animate max-w-xl text-lead font-light text-ink/80 text-pretty"
                >
                  Explore a fully populated environment with real scheduling,
                  charting, billing, reporting, and patient workflows.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {BENEFITS.map((item) => (
                  <li
                    key={item.label}
                    data-reveal
                    className="will-animate flex items-center gap-4 self-start rounded-full border-4 border-line bg-white py-2 pr-6 pl-2 shadow-[0_0_18px_rgba(0,0,0,0.1)]"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.grad}`}
                    >
                      <Check />
                    </span>
                    <span className="text-fluid-sm font-medium tracking-[-0.02em] text-ink">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div data-reveal className="will-animate flex flex-wrap gap-4">
                <a
                  href="#demo"
                  className="rounded-full bg-grad-dark px-7 py-3 font-display text-xl text-white transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                >
                  Book Demo
                </a>
                <a
                  href="#demo"
                  className="rounded-full border border-ink/10 bg-gradient-to-b from-white to-[#e9e9e9] px-7 py-3 font-display text-xl text-ink transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Right — product screenshot */}
            <div data-reveal className="will-animate">
              <img
                src={demoDashboard}
                alt="Kuralogiq dashboard with scheduling, billing and reporting"
                width={1210}
                height={1138}
                loading="lazy"
                decoding="async"
                className="w-full rounded-tl-[24px] rounded-br-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
