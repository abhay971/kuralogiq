import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SplineScene from '@/components/ui/SplineScene'
import Spotlight from '@/components/ui/Spotlight'

/**
 * LiveDemo — a wide dark card: serif headline + copy + two CTAs on the left,
 * an interactive 3D Spline robot on the right (lazy-loaded). A spotlight sweep
 * lights the card. Stacks on mobile. Sits on the warm dark-brown band.
 */
export default function LiveDemo() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const [showScene, setShowScene] = useState(false)

  // Only load the heavy 3D scene once the section is near the viewport.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScene(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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
      ref={root}
      className="pt-4 pb-12 md:pt-6 md:pb-16"
      // Background now comes from the shared <BandBackdrop /> (see Home.jsx).
      // Previous: style={{ background: 'linear-gradient(180deg, #120a06 0%, #0c0805 100%)' }}
    >
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[24px] border-4 border-white/10 bg-grad-dark text-white">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

          <div className="relative grid grid-cols-1 items-center gap-4 p-6 md:grid-cols-2 md:p-10">
            {/* Text + CTAs */}
            <div className="relative z-10 flex flex-col items-start">
              <h2
                data-reveal
                className="will-animate font-display text-h2 leading-[1.05] text-balance"
              >
                See it all in one live demonstration.
              </h2>
              <p
                data-reveal
                className="will-animate mt-5 max-w-md text-lead font-light text-white/80 text-pretty"
              >
                Take a guided walkthrough tailored to your specialty, or explore the platform
                yourself using our live demo environment.
              </p>
              <div data-reveal className="will-animate mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#demo"
                  className="rounded-full bg-grad-yellow px-7 py-4 font-display text-lg text-black transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                >
                  Book a Demo
                </a>
                <a
                  href="#demo"
                  className="rounded-full border border-black/10 bg-gradient-to-b from-white to-[#e9e9e9] px-7 py-4 font-display text-lg text-black transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
                >
                  Try the Live Demo
                </a>
              </div>
            </div>

            {/* Interactive 3D robot (loads when scrolled into view) */}
            <div data-reveal className="relative h-[320px] w-full md:h-[440px]">
              {showScene && (
                // Render the scene larger than the box so the robot scales up
                // without changing the card/layout; overflow is clipped by the card.
                <div className="absolute left-1/2 top-1/2 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="h-full w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
