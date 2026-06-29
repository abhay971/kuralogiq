import { useRef } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import aiIcon from '@/assets/icons/nosales-ai.svg'
import platformIcon from '@/assets/icons/nosales-platform.svg'
import locationIcon from '@/assets/icons/nosales-location.svg'
import specialtiesIcon from '@/assets/icons/nosales-specialties.svg'

/**
 * NoSalesCall — centered serif headline + a dark "Book Now" pill, ringed by
 * four glassy trust badges. On desktop the badges fly in from off the left/right
 * edges as the section scrolls in, float beside the heading, then slide back out
 * and fade as the section scrolls away (scrubbed to scroll position). On small
 * screens they collapse into a tidy grid below the CTA with a simple reveal.
 */
const BADGES = [
  {
    icon: aiIcon,
    label: 'AI-Assisted Workflows',
    circle: 'bg-[#ffc801]',
    iconSize: 'size-[18px]',
    side: 'left',
    float: 'left-0 top-[14%] -rotate-3',
  },
  {
    icon: platformIcon,
    label: 'One Connected Platform',
    circle: null, // the icon is its own 40px badge
    iconSize: 'size-10',
    side: 'right',
    float: 'right-0 top-[20%] rotate-3',
  },
  {
    icon: specialtiesIcon,
    label: 'Built for 4 Specialties',
    circle: 'bg-[#d66519]',
    iconSize: 'size-5',
    side: 'left',
    float: 'left-[3%] bottom-[16%] rotate-3',
  },
  {
    icon: locationIcon,
    label: 'Multi-Location Ready',
    circle: 'bg-[#329a79]',
    iconSize: 'size-5',
    side: 'right',
    float: 'right-[3%] bottom-[12%] -rotate-3',
  },
]

function Badge({ icon, label, circle, iconSize, className, nowrap = false, ...rest }) {
  return (
    <div
      {...rest}
      className={cn(
        'will-animate flex items-center gap-2 rounded-full border-4 border-line',
        'bg-gradient-to-r from-[#f2f2f2] to-[#ebebeb] py-2 pl-2 pr-5',
        'shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      {circle ? (
        <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', circle)}>
          <img src={icon} alt="" aria-hidden="true" className={iconSize} />
        </span>
      ) : (
        <img src={icon} alt="" aria-hidden="true" className={cn('shrink-0', iconSize)} />
      )}
      <span
        className={cn(
          'font-sans text-sm font-semibold tracking-tight text-ink md:text-base',
          nowrap && 'whitespace-nowrap'
        )}
      >
        {label}
      </span>
    </div>
  )
}

export default function NoSalesCall() {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reduceMotion) return

      // Heading + button (and the mobile badge grid) — simple one-shot reveal.
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 48,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      })

      // Floating badges (desktop only).
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const left = gsap.utils.toArray('[data-badge="left"]', root.current)
        const right = gsap.utils.toArray('[data-badge="right"]', root.current)
        const all = [...left, ...right]

        // Gentle, endless idle float — y axis only, so it never touches the
        // xPercent / autoAlpha / scale that the entrance timeline below owns.
        all.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -10 : -14,
            duration: 2.6 + i * 0.25,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        })

        // Fly the badges in from the edges whenever the section is on screen,
        // and reverse them out as it leaves — handled in BOTH scroll directions
        // via toggleActions (enter / leave / enter-back / leave-back). This is
        // what makes them reappear when scrolling bottom → top, not just down.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top 80%', // section enters the lower viewport
              end: 'bottom 20%', // section exits the upper viewport
              toggleActions: 'play reverse play reverse',
            },
          })
          .from(
            left,
            { xPercent: -120, autoAlpha: 0, scale: 0.9, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
            0
          )
          .from(
            right,
            { xPercent: 120, autoAlpha: 0, scale: 0.9, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
            0
          )
      })

      return () => mm.revert()
    },
    { scope: root, dependencies: [reduceMotion] }
  )

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="container-px relative">
        {/* Floating badges — desktop only */}
        {BADGES.map((b) => (
          <Badge
            key={b.label}
            icon={b.icon}
            label={b.label}
            circle={b.circle}
            iconSize={b.iconSize}
            nowrap
            data-badge={b.side}
            className={cn('absolute z-10 hidden lg:flex', b.float)}
          />
        ))}

        <div className="mx-auto flex max-w-3xl flex-col items-center py-6 text-center lg:py-16">
          <h2
            data-reveal
            className="font-display text-h2 leading-[1.08] text-ink text-balance"
          >
            No sales call required. Explore the platform at your own pace.
          </h2>

          <div data-reveal className="mt-8">
            <Button
              href="#demo"
              variant="dark"
              className="border-4 border-white/20 px-8 py-3 text-base"
            >
              Book Now
            </Button>
          </div>

          {/* Badges grid — mobile / tablet */}
          <div className="mt-12 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {BADGES.map((b) => (
              <Badge
                key={b.label}
                data-reveal
                icon={b.icon}
                label={b.label}
                circle={b.circle}
                iconSize={b.iconSize}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
