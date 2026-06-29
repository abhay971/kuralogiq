import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Button from '@/components/ui/Button'
import folder from '@/assets/images/finishnote-folder.svg'
import iconSoap from '@/assets/icons/finishnote-soap.svg'
import iconReuse from '@/assets/icons/finishnote-reuse.svg'
import iconTemplates from '@/assets/icons/finishnote-templates.svg'

const FEATURES = [
  {
    icon: iconSoap,
    gradient: 'bg-grad-orange',
    title: 'Guided SOAP Notes',
    description: 'Structured workflows with live narrative generation.',
  },
  {
    icon: iconReuse,
    gradient: 'bg-grad-yellow',
    title: 'Same-As-Last-Treatment',
    description: 'Reuse and update previous visits with one click.',
  },
  {
    icon: iconTemplates,
    gradient: 'bg-grad-teal',
    title: 'Specialty-Specific Templates',
    description: 'Built for chiropractic, therapy, nutrition, and integrative care.',
  },
]

/**
 * FinishNote — "Finish your note before the patient reaches the front desk."
 * Top row: yellow folder illustration + heading/copy/CTA. Below: three
 * feature pills (1-col mobile → 3-col desktop).
 */
export default function FinishNote() {
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
    <section ref={root} className="py-20 md:py-28 lg:py-32">
      <div className="container-px flex flex-col gap-16 lg:gap-20">
        {/* Top — illustration + heading */}
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
          <div
            data-reveal
            className="will-animate flex items-center justify-center rounded-[24px] border-4 border-line bg-white p-8 shadow-[0_16px_36px_rgba(0,0,0,0.02)]"
          >
            <img
              src={folder}
              alt="Stack of clinical notes"
              width={432}
              height={387}
              loading="lazy"
              decoding="async"
              className="w-full max-w-sm"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <h2
              data-reveal
              className="font-display text-h2 leading-[1.05] text-ink text-balance"
            >
              Finish your note before the patient reaches the front desk.
            </h2>
            <p data-reveal className="text-lead font-semibold text-ink">
              Documentation should work the way you do.
            </p>
            <p data-reveal className="text-lead font-light text-ink/80 text-pretty">
              KURALOGIQ transforms structured inputs into clear, compliant notes in real time,
              helping providers spend less time typing and more time treating patients.
            </p>
            <Button
              data-reveal
              href="#ai"
              variant="dark"
              className="mt-2 border-4 border-white/20"
            >
              Explore Charting
            </Button>
          </div>
        </div>

        {/* Bottom — feature pills */}
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              data-reveal
              className="flex items-center gap-4 rounded-[48px] border-4 border-line bg-white py-2 pl-2 pr-6 shadow-[0_0_18px_rgba(0,0,0,0.06)]"
            >
              <span
                className={`flex size-[84px] shrink-0 items-center justify-center rounded-full ${feature.gradient}`}
              >
                <img src={feature.icon} alt="" aria-hidden="true" className="size-9" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-sans text-lg font-bold text-ink">{feature.title}</span>
                <span className="font-sans text-fluid-sm font-medium text-ink/70">
                  {feature.description}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
