import { cn } from '@/lib/utils'

/**
 * Centered section heading + optional lead paragraph.
 * Matches Figma: 56px PP Editorial New title, 20px Switzer-light lead.
 * Add `data-reveal` targets so the section's GSAP timeline can animate them.
 */
export default function SectionHeading({ title, lead, align = 'center', className, children }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center mx-auto max-w-3xl' : 'items-start text-left',
        className
      )}
    >
      <h2 data-reveal className="font-display text-h2 leading-[1.05] text-ink text-balance">
        {title}
      </h2>
      {lead && (
        <p data-reveal className="text-lead font-light text-ink/80 text-pretty">
          {lead}
        </p>
      )}
      {children}
    </div>
  )
}
