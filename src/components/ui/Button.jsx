import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * Brand button. Variants pulled from Figma:
 * - primary : orange radial gradient, white text
 * - outline : 1px ink border, transparent
 * - dark    : black→graphite gradient, white text
 *
 * Renders <a>, <Link>, or <button> depending on props (href / to / onClick).
 */
const VARIANTS = {
  primary: 'bg-grad-orange text-white',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  dark: 'bg-grad-dark text-white',
}

export default function Button({
  variant = 'primary',
  className,
  children,
  to,
  href,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-6 py-4',
    'font-display text-base md:text-lg leading-none whitespace-nowrap',
    'transition-[transform,opacity,background-color] duration-300 ease-[var(--ease-out-expo)]',
    'hover:-translate-y-0.5 active:translate-y-0 will-animate',
    VARIANTS[variant],
    className
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
